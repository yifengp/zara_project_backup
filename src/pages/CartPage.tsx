import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Edit3, Trash2, ArrowLeft } from 'lucide-react';
import { CartItem, Product } from '../App';

interface CartPageProps {
  items: CartItem[];
  onUpdateItem: (itemId: string, size: string, color: string) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  products: Product[];
}

const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onUpdateQuantity,
  products
}) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const handleEdit = (item: CartItem) => {
    setEditingItem(item.id);
  };

  const handleSaveEdit = (itemId: string, size: string, color: string) => {
    onUpdateItem(itemId, size, color);
    setEditingItem(null);
  };

  const getProductById = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="p-3 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-light tracking-wide">Shopping Cart</h1>
                <p className="text-gray-500 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 border-2 border-gray-300 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-xl mb-2">Your cart is empty</p>
            <p className="text-gray-400 mb-8">Add some items to get started</p>
            <Link
              to="/"
              className="inline-block bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors rounded-xl font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => {
                const product = getProductById(item.productId);
                const isEditing = editingItem === item.id;
                
                return (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-32 h-40 bg-white rounded-xl overflow-hidden shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={() => handleEdit(item)}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-medium text-black mb-2 truncate">{item.name}</h3>
                        <div className="text-base text-gray-600 mb-4">
                          {isEditing && product ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                                <select
                                  defaultValue={item.size}
                                  className="w-full text-base border-gray-200 rounded-xl focus:ring-black focus:border-black bg-white px-4 py-3"
                                  onChange={(e) => {
                                    const newSize = e.target.value;
                                    handleSaveEdit(item.id, newSize, item.color);
                                  }}
                                >
                                  {product.sizes.filter(size => size !== 'S').map(size => (
                                    <option key={size} value={size}>{size}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                <select
                                  defaultValue={item.color}
                                  className="w-full text-base border-gray-200 rounded-xl focus:ring-black focus:border-black bg-white px-4 py-3"
                                  onChange={(e) => {
                                    const newColor = e.target.value;
                                    handleSaveEdit(item.id, item.size, newColor);
                                  }}
                                >
                                  {product.colors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-6">
                              <span className="flex items-center gap-2">
                                <span className="text-gray-500">Size:</span>
                                <span className="font-medium">{item.size}</span>
                              </span>
                              <span className="flex items-center gap-2">
                                <span className="text-gray-500">Color:</span>
                                <span className="font-medium">{item.color}</span>
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Price */}
                        <div className="text-2xl font-medium text-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 bg-white rounded-xl p-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-medium text-lg">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-3 text-gray-500 hover:text-gray-700 hover:bg-white rounded-xl transition-colors"
                          title="Edit item"
                        >
                          <Edit3 size={20} />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-8 sticky top-32">
                <h2 className="text-2xl font-medium text-black mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{total >= 50 ? 'Free' : '$5.99'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-xl font-medium text-black">
                    <span>Total</span>
                    <span>${(total + (total >= 50 ? 0 : 5.99) + (total * 0.08)).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm text-gray-500">
                  <p>• Free shipping on orders over $50</p>
                  <p>• Free returns within 30 days</p>
                  <p>• Secure payment with SSL encryption</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-black text-white py-4 px-8 hover:bg-gray-800 transition-colors font-medium rounded-xl text-lg">
                    Proceed to Checkout
                  </button>
                  <Link
                    to="/"
                    className="block w-full text-center bg-white text-black border-2 border-gray-200 py-4 px-8 hover:bg-gray-50 transition-colors font-medium rounded-xl text-lg"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;