"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Coffee,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Database,
  ShieldAlert,
  Search,
  Save,
  Tag,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/data/menuData";
import { MenuItem } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New item form state
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    slug: "",
    description: "",
    price: 4.5,
    category_id: "coffee",
    category_name: "Coffee",
    image_url: "/images/flat-white.jpg",
    is_available: true,
    is_featured: false,
    dietary_tags: [],
    allergen_information: [],
    sort_order: items.length + 1,
    is_verified: true,
  });

  const toggleAvailability = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_available: !item.is_available } : item
      )
    );
    showNotice("Item availability updated");
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
    showNotice("Price updated successfully");
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to remove this item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      showNotice("Item removed from catalog");
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.description || !newItem.price) {
      alert("Please fill in all required fields.");
      return;
    }

    const created: MenuItem = {
      id: `custom-${Date.now()}`,
      name: newItem.name,
      slug: newItem.name.toLowerCase().replace(/\s+/g, "-"),
      description: newItem.description,
      price: Number(newItem.price),
      category_id: newItem.category_id || "coffee",
      category_name:
        MENU_CATEGORIES.find((c) => c.id === newItem.category_id)?.name ||
        "Coffee",
      image_url: newItem.image_url || "/images/flat-white.jpg",
      is_available: true,
      is_featured: Boolean(newItem.is_featured),
      dietary_tags: newItem.dietary_tags || [],
      allergen_information: newItem.allergen_information || [],
      sort_order: items.length + 1,
      is_verified: true,
    };

    setItems((prev) => [created, ...prev]);
    setShowAddModal(false);
    showNotice(`Added "${created.name}" to menu!`);
    setNewItem({
      name: "",
      slug: "",
      description: "",
      price: 4.5,
      category_id: "coffee",
      category_name: "Coffee",
      image_url: "/images/flat-white.jpg",
      is_available: true,
      is_featured: false,
      dietary_tags: [],
      allergen_information: [],
      sort_order: items.length + 1,
      is_verified: true,
    });
  };

  const showNotice = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const filteredItems = items.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category_id === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-cream text-espresso py-10 px-4 sm:px-6 lg:px-12 font-sans noise-overlay">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-latte/40">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-vanilla border border-latte/50 flex items-center justify-center text-espresso hover:bg-cream transition-colors shadow-sm"
              title="Return to public site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-espresso">
                Cafe Face Manager
              </h1>
              <p className="text-xs text-espresso/70">
                519 Bristol Road · Selly Oak, Birmingham
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase Status Indicator */}
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border ${
                isSupabaseConfigured
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>
                {isSupabaseConfigured
                  ? "Supabase Connected"
                  : "Local Store Mode (Postgres Ready)"}
              </span>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-espresso text-vanilla text-xs sm:text-sm font-medium hover:bg-terracotta transition-colors shadow-pill cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Item</span>
            </button>
          </div>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div className="my-6 p-4 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-sm font-medium flex items-center gap-2 shadow-sm">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Database setup notice if Supabase not configured */}
        {!isSupabaseConfigured && (
          <div className="my-6 p-5 rounded-2xl bg-vanilla border border-amber-300/80 flex items-start gap-3 shadow-soft">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-espresso/80">
              <span className="font-bold text-espresso">
                Production Database Ready:{" "}
              </span>
              The PostgreSQL schema with Row Level Security is prepared in{" "}
              <code className="px-1.5 py-0.5 rounded bg-cream font-mono text-terracotta">
                supabase/schema.sql
              </code>
              . Add your Supabase keys to{" "}
              <code className="px-1.5 py-0.5 rounded bg-cream font-mono text-terracotta">
                .env.local
              </code>{" "}
              to enable live cloud persistence and Supabase Auth.
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="my-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-vanilla border border-latte/40 shadow-soft">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-espresso text-vanilla"
                    : "bg-cream text-espresso/70 hover:bg-cream/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-cream border border-latte/50 text-xs text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        {/* Menu Items Table */}
        <div className="bg-vanilla rounded-3xl border border-latte/40 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-cream/80 border-b border-latte/40 text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price (GBP)</th>
                  <th className="py-4 px-4">Dietary Tags</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-latte/30">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-cream/40 transition-colors"
                  >
                    {/* Product Image & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-latte/20 shrink-0" style={{ position: "relative" }}>
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-espresso">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-espresso/60 truncate max-w-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-espresso/80">
                      <span className="px-2.5 py-1 rounded-full bg-cream border border-latte/40 text-xs">
                        {item.category_name}
                      </span>
                    </td>

                    {/* Price with Inline Edit */}
                    <td className="py-4 px-4 font-mono font-medium text-espresso">
                      <div className="flex items-center gap-1">
                        <span>£</span>
                        <input
                          type="number"
                          step="0.05"
                          defaultValue={item.price.toFixed(2)}
                          onBlur={(e) =>
                            handleUpdatePrice(item.id, Number(e.target.value))
                          }
                          className="w-16 px-1.5 py-1 rounded bg-cream border border-latte/50 text-xs focus:outline-none focus:border-terracotta"
                        />
                      </div>
                    </td>

                    {/* Dietary Tags */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.dietary_tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-cream text-espresso/80 border border-latte/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Availability Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleAvailability(item.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          item.is_available
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        {item.is_available ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Available</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            <span>Sold Out</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg text-espresso/50 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/60 backdrop-blur-sm">
            <div className="bg-vanilla rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-latte/50 shadow-deep">
              <h3 className="font-serif text-2xl font-bold text-espresso mb-4">
                Add New Menu Item
              </h3>
              <form onSubmit={handleAddItem} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold mb-1">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    placeholder="e.g. Saffron Rose Latte"
                    className="w-full px-3 py-2 rounded-xl bg-cream border border-latte/50 focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                      value={newItem.category_id}
                      onChange={(e) =>
                        setNewItem({ ...newItem, category_id: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-cream border border-latte/50 focus:outline-none focus:border-terracotta"
                    >
                      {MENU_CATEGORIES.filter((c) => c.id !== "all").map(
                        (cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Price (£) *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-cream border border-latte/50 focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    placeholder="Describe flavor notes, ingredients, and preparation..."
                    className="w-full px-3 py-2 rounded-xl bg-cream border border-latte/50 focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-latte/30">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-full bg-cream text-espresso hover:bg-cream/80 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-espresso text-vanilla hover:bg-terracotta font-medium cursor-pointer shadow-pill"
                  >
                    Save Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

