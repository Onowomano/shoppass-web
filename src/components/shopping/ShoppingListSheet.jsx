import { Info, MessageCircle, Send, ShoppingCart } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { FLAT_SERVICE_FEE } from '../../config/business'
import { useProducts } from '../../hooks/useProducts'
import Button from '../Button'
import WhatsAppIcon from '../WhatsAppIcon'
import ListItem from './ListItem'
import RadioSelect from './RadioSelect'
import SearchInput from './SearchInput'
import SideSheet from './SideSheet'

const WHATSAPP_NUMBER = '2348080828181'
const DELIVERY_FEE = 0
const LS_KEY = 'shoppass_list'
const DEBOUNCE_MS = 300
const MIN_QUERY_LEN = 2

// ── Helpers ────────────────────────────────────────────────────────────────

function parseAmount(price) {
  if (!price) return 0
  const n = parseInt(price.replace(/[^\d]/g, ''), 10)
  return isNaN(n) ? 0 : n
}

function formatAmount(n) {
  return '₦' + n.toLocaleString('en-NG')
}

function groupProducts(products) {
  const map = new Map()
  for (const p of products) {
    const [productId] = p.id.split('-')
    if (!map.has(productId)) {
      map.set(productId, { productId, name: p.name, variants: [] })
    }
    map.get(productId).variants.push({ id: p.id, variant: p.variant, price: p.price })
  }
  return Array.from(map.values())
}

// ── Tooltip ────────────────────────────────────────────────────────────────

function Tooltip({ text }) {
  const [visible, setVisible] = useState(false)
  return (
    <span className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="text-icon-primary cursor-default"
        tabIndex={0}
        aria-label={text}
      >
        <Info size={14} />
      </button>
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-bg-static text-text-on-solid text-body-md rounded-xl px-3 py-2 z-10 shadow-md pointer-events-none">
          {text}
        </span>
      )}
    </span>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function ShoppingListSheet({ isOpen, onClose }) {
  const { products, loading } = useProducts()
  const productGroups = useMemo(() => groupProducts(products), [products])

  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [listItems, setListItems] = useState([])
  const [view, setView] = useState('list') // 'list' | 'success'
  const [savedPrompt, setSavedPrompt] = useState(false)
  const [savedItems, setSavedItems] = useState([])

  // Debounce query
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  // Check localStorage when sheet opens
  useEffect(() => {
    if (!isOpen) return
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0 && listItems.length === 0) {
          setSavedItems(parsed)
          setSavedPrompt(true)
        }
      }
    } catch {}
  }, [isOpen])

  // Save list to localStorage on change
  useEffect(() => {
    if (listItems.length > 0) {
      localStorage.setItem(LS_KEY, JSON.stringify(listItems))
    }
  }, [listItems])

  // Reset view when sheet opens
  useEffect(() => {
    if (isOpen) setView('list')
  }, [isOpen])

  // ── Search & chip logic ─────────────────────────────────────────────────

  const hasQuery = debouncedQuery.length >= MIN_QUERY_LEN
  const selectedGroup = productGroups.find(g => g.productId === selectedProductId)

  const filteredGroups = useMemo(() => {
    if (!hasQuery) return []
    return productGroups.filter(g =>
      g.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [hasQuery, debouncedQuery, productGroups])

  const showNoMatch = hasQuery && filteredGroups.length === 0 && !selectedProductId

  const handleProductSelect = (group) => {
    if (group.variants.length === 1) {
      addItem(group.name, group.variants[0])
      resetSearch()
    } else {
      setSelectedProductId(group.productId)
    }
  }

  const handleProductClear = () => {
    setSelectedProductId(null)
  }

  const handleVariantSelect = (variant) => {
    addItem(selectedGroup.name, variant)
    resetSearch()
  }

  const handleAddCustom = () => {
    const trimmed = query.trim()
    if (!trimmed) return
    setListItems(prev => [
      ...prev,
      { id: Date.now(), name: trimmed, variant: null, price: null, qty: 1 },
    ])
    resetSearch()
  }

  const resetSearch = () => {
    setQuery('')
    setDebouncedQuery('')
    setSelectedProductId(null)
  }

  // ── List management ─────────────────────────────────────────────────────

  function addItem(name, variant) {
    setListItems(prev => [
      ...prev,
      {
        id: Date.now(),
        name,
        variant: variant.variant,
        price: variant.price,
        qty: 1,
      },
    ])
  }

  const handleQtyChange = (id, qty) => {
    setListItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const handleDelete = (id) => {
    const item = listItems.find(i => i.id === id)
    if (!item) return
    setListItems(prev => prev.filter(i => i.id !== id))

    const toastId = toast(
      <div className="flex items-center justify-between gap-4 w-full">
        <span className="text-body-md text-text-primary">"{item.name}" removed</span>
        <button
          onClick={() => {
            setListItems(prev => [...prev, item])
            toast.dismiss(toastId)
          }}
          className="text-body-md-bold text-text-accent-orange whitespace-nowrap cursor-pointer"
        >
          Undo
        </button>
      </div>,
      { autoClose: 4000, closeButton: false }
    )
  }

  // ── Price summary ───────────────────────────────────────────────────────

  const subtotal = listItems.reduce((sum, item) => {
    return sum + parseAmount(item.price) * item.qty
  }, 0)

  const serviceFeeAmount = parseAmount(FLAT_SERVICE_FEE)
  const total = subtotal + serviceFeeAmount + DELIVERY_FEE

  // ── WhatsApp send ───────────────────────────────────────────────────────

  const buildMessage = () => {
    const lines = listItems.map(item => {
      const label = item.variant ? `${item.name} (${item.variant})` : item.name
      const price = item.price
        ? formatAmount(parseAmount(item.price) * item.qty)
        : 'TBD'
      return `• ${label} x${item.qty} — ${price}`
    })

    return [
      "Hi! Here's my shopping list:",
      ...lines,
    ].join('\n')
  }

  const handleSend = () => {
    const msg = buildMessage()
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setView('success')
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Shopping List"
    >
      {view === 'success' ? (
        <SuccessScreen
          onResend={handleSend}
          onDone={onClose}
        />
      ) : (
        <div className="flex flex-col h-full">

          {/* Saved list prompt */}
          {savedPrompt && (
            <div className="mx-6 mt-6 p-4 bg-bg-accent-orange-light rounded-2xl flex flex-col gap-3 border border-border-accent-orange-light">
              <p className="text-body-md-bold text-text-primary">
                You have a saved list from your last visit. Continue with it or start fresh?
              </p>
              <div className="flex gap-2">
                <Button
                  label="Continue"
                  type="Filled"
                  onClick={() => {
                    setListItems(savedItems)
                    setSavedPrompt(false)
                  }}
                />
                <Button
                  label="Start fresh"
                  type="Outline"
                  onClick={() => {
                    localStorage.removeItem(LS_KEY)
                    setSavedPrompt(false)
                  }}
                />
              </div>
            </div>
          )}

          {/* Search */}
          <div className="px-6 pt-6 pb-4 flex flex-col gap-3">
            <SearchInput value={query} onChange={setQuery} />

            {/* Product chips */}
            {!selectedProductId && filteredGroups.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filteredGroups.map(group => (
                  <RadioSelect
                    key={group.productId}
                    label={group.name}
                    selected={false}
                    onSelect={() => handleProductSelect(group)}
                    onClear={() => {}}
                  />
                ))}
              </div>
            )}

            {/* Add custom chip */}
            {showNoMatch && (
              <div className="flex flex-wrap gap-2">
                <RadioSelect
                  label={`Add "${debouncedQuery}"`}
                  selected={false}
                  onSelect={handleAddCustom}
                  onClear={() => {}}
                />
              </div>
            )}

            {/* Selected product + variant chips */}
            {selectedGroup && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <RadioSelect
                    label={selectedGroup.name}
                    selected
                    onSelect={() => {}}
                    onClear={handleProductClear}
                  />
                </div>
                <p className="text-body-md text-text-secondary">Pick a variant:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGroup.variants.map(v => (
                    <RadioSelect
                      key={v.id}
                      label={v.variant}
                      selected={false}
                      onSelect={() => handleVariantSelect(v)}
                      onClear={() => {}}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6">
            {listItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <ShoppingCart size={40} className="text-icon-disabled" />
                <p className="text-body-lg text-text-tertiary">
                  Your list is empty. Search for an item above to get started.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border-primary">
                {listItems.map(item => (
                  <ListItem
                    key={item.id}
                    name={item.name}
                    variant={item.variant}
                    price={item.price}
                    qty={item.qty}
                    onQtyChange={qty => handleQtyChange(item.id, qty)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price summary + send */}
          {listItems.length > 0 && (
            <div className="px-6 py-5 border-t border-border-primary flex flex-col gap-4 shrink-0">
              <div className="flex flex-col gap-2">
                <SummaryRow label="Subtotal" value={formatAmount(subtotal)} />
                <SummaryRow
                  label="Service Fee"
                  value={FLAT_SERVICE_FEE}
                  tooltip="We charge a flat service fee instead of inflating item prices."
                />
                <SummaryRow
                  label="Delivery Fee"
                  value={formatAmount(DELIVERY_FEE)}
                  tooltip="Delivery is arranged separately via Uber or your preferred dispatch."
                />
                <div className="border-t border-border-primary pt-2 mt-1">
                  <SummaryRow
                    label="Total"
                    value={formatAmount(total)}
                    bold
                  />
                </div>
              </div>

              <Button
                label="Send List"
                leftIcon={<WhatsAppIcon size={20} />}
                type="Filled"
                onClick={handleSend}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}
    </SideSheet>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SummaryRow({ label, value, tooltip, bold }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <span className={bold ? 'text-sub-heading text-text-primary' : 'text-body-lg text-text-secondary'}>
          {label}
        </span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <span className={bold ? 'text-sub-heading text-text-primary' : 'text-body-lg-bold text-text-primary'}>
        {value}
      </span>
    </div>
  )
}

function SuccessScreen({ onResend, onDone }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full px-6 text-center">
      <div className="flex items-center justify-center size-20 rounded-full bg-bg-accent-orange-light">
        <Send size={32} className="text-icon-accent-orange" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sub-heading text-text-primary">Your list has been sent!</p>
        <p className="text-body-lg text-text-secondary">
          The sales team will review your list and follow up to confirm pricing.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Button
          label="Resend List"
          leftIcon={<MessageCircle size={20} />}
          type="Outline"
          onClick={onResend}
          className="w-full"
        />
        <Button
          label="Done"
          type="Filled"
          onClick={onDone}
          className="w-full"
        />
      </div>
    </div>
  )
}
