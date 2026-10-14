import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import Card from '../components/Card'
import Toggle from '../components/Toggle'

interface SettingsForm {
  name: string
  email: string
  storeName: string
  currency: string
  notifications: {
    newOrders: boolean
    lowStock: boolean
    weeklyReport: boolean
  }
}

const initialSettings: SettingsForm = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  storeName: 'ShopPulse',
  currency: 'USD',
  notifications: { newOrders: true, lowStock: true, weeklyReport: false },
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none'

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export default function SettingsPage() {
  // "saved" is the last submitted version; "form" is what the user is editing.
  const [saved, setSaved] = useState(initialSettings)
  const [form, setForm] = useState(initialSettings)
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'storeName', string>>>({})
  const [showSaved, setShowSaved] = useState(false)

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved)

  useEffect(() => {
    if (!showSaved) return
    const timer = setTimeout(() => setShowSaved(false), 3000)
    return () => clearTimeout(timer)
  }, [showSaved])

  const update = <K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const updateNotification = (key: keyof SettingsForm['notifications'], value: boolean) =>
    setForm((f) => ({ ...f, notifications: { ...f.notifications, [key]: value } }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: typeof errors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!isValidEmail(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.storeName.trim()) nextErrors.storeName = 'Store name is required.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaved(form)
    setShowSaved(true)
  }

  const handleCancel = () => {
    setForm(saved)
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <Card title="Profile" description="Your personal account information.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Full name
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className="mt-1 block text-xs font-normal text-rose-600">{errors.name}</span>}
          </label>
          <label className="block text-sm font-medium">
            Email
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="mt-1 block text-xs font-normal text-rose-600">{errors.email}</span>}
          </label>
        </div>
      </Card>

      <Card title="Store" description="How your store appears to customers.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Store name
            <input
              className={inputClass}
              value={form.storeName}
              onChange={(e) => update('storeName', e.target.value)}
              aria-invalid={!!errors.storeName}
            />
            {errors.storeName && (
              <span className="mt-1 block text-xs font-normal text-rose-600">{errors.storeName}</span>
            )}
          </label>
          <label className="block text-sm font-medium">
            Currency
            <select className={inputClass} value={form.currency} onChange={(e) => update('currency', e.target.value)}>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="DOP">DOP — Dominican Peso</option>
              <option value="MXN">MXN — Mexican Peso</option>
            </select>
          </label>
        </div>
      </Card>

      <Card title="Notifications" description="Choose what you want to be notified about.">
        <div className="divide-y divide-slate-100">
          <Toggle
            label="New orders"
            description="Get notified every time a customer places an order."
            checked={form.notifications.newOrders}
            onChange={(v) => updateNotification('newOrders', v)}
          />
          <Toggle
            label="Low stock alerts"
            description="Get an alert when a product drops below 10 units."
            checked={form.notifications.lowStock}
            onChange={(v) => updateNotification('lowStock', v)}
          />
          <Toggle
            label="Weekly report"
            description="Receive a summary of sales every Monday."
            checked={form.notifications.weeklyReport}
            onChange={(v) => updateNotification('weeklyReport', v)}
          />
        </div>
      </Card>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
        {showSaved && (
          <p role="status" className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 sm:mr-auto">
            <CheckCircle2 className="size-4" aria-hidden="true" /> Changes saved
          </p>
        )}
        <button
          type="button"
          onClick={handleCancel}
          disabled={!isDirty}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isDirty}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save changes
        </button>
      </div>
    </form>
  )
}
