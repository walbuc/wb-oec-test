'use client'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './forms.module.css'

export function getButtonClassName({
  size,
  variant,
}: {
  size: 'xs' | 'sm' | 'md' | 'md-wide' | 'pill'
  variant: 'primary' | 'secondary'
}) {
  const baseClassName =
    'text-center rounded-full font-bold outline-none transition-[background-color,color] duration-200 disabled:bg-night-500 disabled:text-night-200'
  const primaryClassName =
    'bg-accent-purple hover:bg-accent-yellow hover:text-night-700 focus:bg-accent-yellow focus:text-night-700 active:bg-accent-yellow-muted'
  const secondaryClassName =
    'border-[1.5px] border-night-400 bg-night-700 hover:border-accent-purple focus:border-accent-purple active:border-accent-purple-lighter'
  const extraSmallClassName = 'py-2 px-3 text-body-xs'
  const smallClassName = 'px-10 py-[14px] text-body-xs'
  const mediumClassName = 'px-14 py-5 text-lg'
  const mediumWideClassName = 'px-24 py-5 text-lg'
  const pillClassName = 'px-12 py-3 leading-3'
  const className = clsx(baseClassName, {
    [primaryClassName]: variant === 'primary',
    [secondaryClassName]: variant === 'secondary',
    [extraSmallClassName]: size === 'xs',
    [smallClassName]: size === 'sm',
    [mediumClassName]: size === 'md',
    [mediumWideClassName]: size === 'md-wide',
    [pillClassName]: size === 'pill',
  })
  return className
}

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({errors}: {errors?: ListOfErrors}) {
  const errorsToRender = errors?.filter(Boolean)
  if (!errorsToRender?.length) return null
  return (
    <ul className="space-y-1">
      {errorsToRender.map(e => (
        <li key={e} className="text-[10px] text-accent-red">
          {e}
        </li>
      ))}
    </ul>
  )
}

export function ButtonLink({
  size,
  variant,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> &
  Parameters<typeof getButtonClassName>[0]) {
  return <Link {...props} className={getButtonClassName({size, variant})} />
}

export function Button({
  size,
  variant,
  status = 'idle',
  onErrorClick,
  ...props
}: React.ComponentPropsWithoutRef<'button'> &
  Parameters<typeof getButtonClassName>[0] & {
    status?: 'pending' | 'success' | 'error' | 'idle'
    onErrorClick?: () => void
  }) {
  const companion = {
    pending: <span className="inline-block animate-spin">🌀</span>,
    success: <span>✅</span>,
    error: <span>❌</span>,
    idle: null,
  }[status]
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        getButtonClassName({size, variant}),
        'flex justify-center gap-4',
      )}
    >
      <div>{props.children}</div>
      {companion}
    </button>
  )
}

export function Field({
  labelProps,
  inputProps,
  errors,
  className,
}: {
  labelProps: Omit<JSX.IntrinsicElements['label'], 'className'>
  inputProps: Omit<JSX.IntrinsicElements['input'], 'className'>
  errors?: ListOfErrors
  className?: string
}) {
  return (
    <div className={clsx(styles.field, className)}>
      <input
        id={inputProps.name}
        placeholder=" "
        {...inputProps}
        className="h-16 w-full rounded-lg border border-night-400 bg-night-700 px-4 pt-4 text-body-xs caret-white outline-none focus:border-accent-purple disabled:bg-night-400"
      />
      {/* the label comes after the input so we can use the sibling selector in the CSS to give us animated label control in CSS only */}
      <label {...labelProps} htmlFor={inputProps.name} />
      <div className="px-4 pb-3 pt-1">
        {errors?.length ? <ErrorList errors={errors} /> : null}
      </div>
    </div>
  )
}
