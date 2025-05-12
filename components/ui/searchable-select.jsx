"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, X } from "lucide-react"

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Filter options based on search term
  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Find selected option
  const selectedOption = options.find((option) => option.id === value)

  // Handle option selection
  const handleSelect = (option) => {
    onChange(option.id)
    setIsOpen(false)
    setSearchTerm("")
  }

  // Clear selection
  const handleClear = (e) => {
    e.stopPropagation()
    onChange(null)
    setSearchTerm("")
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`flex items-center justify-between p-2 border rounded-md cursor-pointer ${
          error ? "border-destructive" : "border-input"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-background hover:border-gray-400"}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex-1 truncate">
          {selectedOption ? (
            <div className="flex items-center justify-between">
              <span>{selectedOption.name}</span>
              {!disabled && (
                <button onClick={handleClear} className="p-1 hover:bg-gray-100 rounded-full">
                  <X size={14} />
                </button>
              )}
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search size={16} className="absolute right-2 top-2.5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو..."
                className="w-full p-2 pr-8 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-2 cursor-pointer hover:bg-gray-50 ${
                    option.id === value ? "bg-primary/10 text-primary" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">موردی یافت نشد</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
