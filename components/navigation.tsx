'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Layers, Bot, Code2, Globe, Shield, Package, ExternalLink } from 'lucide-react'

const navigation = [
  { name: 'Products', href: '#', hasDropdown: true },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
]

const productsDropdown = {
  'Frame Products': [
    {
      name: 'Frame Codex',
      href: '/codex',
      description: 'The codex of humanity for LLMs',
      icon: Code2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      submenu: [
        { name: 'Browse', href: '/codex', icon: Code2 },
        { name: 'Search & Explore', href: '/codex/search', icon: Search }
      ]
    },
    {
      name: 'Frame API',
      href: '/api',
      description: 'API for humanity\'s knowledge',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ],
  'External Products': [
    {
      name: 'AgentOS',
      href: 'https://agentos.sh',
      description: 'Adaptive AI agency runtime',
      icon: Bot,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      external: true
    },
    {
      name: 'OpenStrand',
      href: 'https://openstrand.ai',
      description: 'AI-native knowledge infrastructure',
      icon: Layers,
      color: 'text-frame-green',
      bgColor: 'bg-frame-green/10',
      external: true,
      hasInfinityIcon: true
    }
  ],
  'Marketplace': [
    {
      name: 'Extensions',
      href: 'https://github.com/framersai/agentos-extensions',
      description: 'Browse AgentOS extensions',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      external: true
    }
  ]
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8">
                <Image 
                  src="/frame-logo-no-subtitle.svg" 
                  alt="Frame.dev" 
                  fill
                  className="dark:hidden transition-transform group-hover:scale-110" 
                />
                <Image 
                  src="/frame-logo-dark-no-subtitle.svg" 
                  alt="Frame.dev" 
                  fill
                  className="hidden dark:block transition-transform group-hover:scale-110" 
                />
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                Frame.dev
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative" ref={item.hasDropdown ? dropdownRef : undefined}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Products Dropdown */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-80 rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                        >
                          {Object.entries(productsDropdown).map(([category, items], categoryIndex) => (
                            <div key={category} className={categoryIndex > 0 ? 'border-t border-gray-200 dark:border-gray-800' : ''}>
                              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  {category}
                                </p>
                              </div>
                              <div className="py-2">
                                {items.map((product) => {
                                  const Icon = product.icon
                                  const content = (
                                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                      <div className={`p-2 rounded-lg ${product.bgColor}`}>
                                        {product.hasInfinityIcon ? (
                                          <svg className={`w-5 h-5 ${product.color}`} viewBox="0 0 24 24" fill="none">
                                            <path d="M18.178 8c3.096 0 5.822 2.016 5.822 4s-2.726 4-5.822 4c-1.408 0-2.726-.416-3.726-1.12-.432.352-.864.672-1.296.992-.752.544-1.52.896-2.404 1.024-.896.128-1.68 0-2.324-.208a6.474 6.474 0 0 1-1.296-.576c-.992.704-2.304 1.12-3.712 1.12C1.224 16.224 0 14.208 0 12.224s2.016-4 4.224-4c1.408 0 2.72.416 3.712 1.12.448-.352.88-.672 1.312-.992.736-.544 1.504-.896 2.388-1.024.896-.128 1.68 0 2.34.208.448.144.88.336 1.28.576.992-.704 2.304-1.12 3.712-1.12h.02Zm0 2c-.56 0-1.168.128-1.68.32.448.416.752.864.928 1.312.096.256.144.512.144.768 0 .256-.048.512-.144.768-.176.448-.48.896-.928 1.312.528.192 1.12.32 1.68.32 2.208 0 3.84-1.12 3.84-2s-1.632-2-3.84-2Zm-8.832 1.312a3.073 3.073 0 0 1-.144-.224c-.336-.56-1.024-1.04-2.032-1.2a3.118 3.118 0 0 0-.928 0c-.416.064-.768.192-1.072.352.128.144.256.288.368.432.192.24.368.48.512.736l.096.16c.096.16.16.32.224.48.064-.16.128-.32.224-.48l.096-.16c.144-.256.32-.496.512-.736.048-.048.096-.112.144-.16Zm2.368-.4c.144.144.256.304.368.464.016.032.032.048.048.08.096.16.16.32.224.48l.144.416c.096-.16.224-.336.368-.496.24-.272.592-.544 1.072-.72-.144-.144-.288-.272-.432-.4-.192-.16-.416-.32-.64-.448-.24-.128-.48-.208-.704-.256-.384-.08-.704-.08-1.024-.016.224.256.416.56.576.896Zm3.392 2.368a1.925 1.925 0 0 0-.368.464c-.016.032-.048.064-.064.096-.096.16-.16.304-.208.464l-.144.416c-.096-.176-.224-.352-.368-.512-.24-.256-.576-.528-1.056-.704.144.144.272.272.432.4.176.16.4.32.624.448.24.128.48.208.704.24.192.032.368.032.544.016.128 0 .24-.016.368-.032-.224-.256-.416-.56-.576-.896h.096Zm-8.368 0c-.144.336-.352.64-.576.896.56-.096 1.168.048 1.712.368.24.144.464.304.64.48.144.128.288.272.432.384-.48-.16-.816-.432-1.056-.704-.144-.16-.272-.336-.368-.512a3.948 3.948 0 0 0-.352-.88c-.032-.032-.048-.064-.08-.096a1.925 1.925 0 0 0-.368-.464h.016Zm-2.56-.336c-.48.16-.816.432-1.056.72-.144.16-.272.336-.368.496.192-.56.528-1.088.912-1.504-.144.08-.288.176-.416.272h-.064Zm.928 2.416c-.016-.048-.064-.096-.096-.16l-.128-.256c-.096.176-.224.352-.368.512-.24.272-.576.544-1.056.72.48-.176.928-.512 1.248-.944.128-.176.256-.368.368-.576l.032-.048v-.256.96Zm2.176-2.72c-.016.032-.032.048-.048.08a6.255 6.255 0 0 0-.368.464 3.948 3.948 0 0 0-.352.88l-.144.416c-.096-.16-.128-.304-.224-.48l-.096-.16-.128-.256c-.096.16-.128.32-.224.48l-.096.16-.128.256c-.096-.176-.144-.336-.24-.496-.16-.272-.384-.528-.64-.736.56.096 1.168-.048 1.728-.368.24-.144.448-.304.624-.48l.096-.08Z" fill="currentColor"/>
                                          </svg>
                                        ) : (
                                          <Icon className={`w-5 h-5 ${product.color}`} />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white group-hover:text-frame-green dark:group-hover:text-frame-green">
                                          {product.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          {product.description}
                                        </p>
                                      </div>
                                      {product.external && (
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                                      )}
                                    </div>
                                  )

                                  return product.external ? (
                                    <a
                                      key={product.name}
                                      href={product.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block"
                                    >
                                      {content}
                                    </a>
                                  ) : (
                                    <Link
                                      key={product.name}
                                      href={product.href}
                                      className="block"
                                      onClick={() => setProductsOpen(false)}
                                    >
                                      {content}
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Link */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://github.com/framersai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {productsOpen && (
                        <div className="mt-2 ml-4 space-y-1">
                          {Object.entries(productsDropdown).map(([category, items]) => (
                            <div key={category} className="mb-4">
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-1">
                                {category}
                              </p>
                              {items.map((product) => {
                                const Icon = product.icon
                                return product.external ? (
                                  <a
                                    key={product.name}
                                    href={product.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                  >
                                    <Icon className={`w-4 h-4 ${product.color}`} />
                                    {product.name}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                ) : (
                                  <Link
                                    key={product.name}
                                    href={product.href}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <Icon className={`w-4 h-4 ${product.color}`} />
                                    {product.name}
                                  </Link>
                                )
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-lg ${
                        pathname === item.href
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* GitHub Link Mobile */}
              <a
                href="https://github.com/framersai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}