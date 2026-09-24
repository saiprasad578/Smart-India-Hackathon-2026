import React, { useState } from 'react';
import { ShoppingBag, Star, ShieldCheck, Heart, Sparkles, MapPin, Plus, Minus, Trash2, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface ConsumerPack {
  id: string;
  name: string;
  farm: string;
  price: number;
  harvested: string;
  rating: number;
  reviews: number;
  image: string;
}

interface CartItem {
  pack: ConsumerPack;
  quantity: number;
}

export const ConsumerPortal: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 402, Green Meadows, Gachibowli, Hyderabad - 500032');

  const consumerPacks: ConsumerPack[] = [
    {
      id: "pack-01",
      name: "Farm Fresh Tomato Basket (2 kg)",
      farm: "Farmer Venkataiah, Shamshabad",
      price: 60,
      harvested: "Harvested Today 06:00 AM",
      rating: 4.9,
      reviews: 84,
      image: "🍅"
    },
    {
      id: "pack-02",
      name: "Organic Red Onion Bag (3 kg)",
      farm: "Farmer Ramulu, Chevella",
      price: 110,
      harvested: "Harvested Yesterday",
      rating: 4.8,
      reviews: 62,
      image: "🧅"
    },
    {
      id: "pack-03",
      name: "Farmgate Potato Pack (2 kg)",
      farm: "Farmer Lakshmi, Maheshwaram",
      price: 50,
      harvested: "Fresh Batch",
      rating: 4.7,
      reviews: 49,
      image: "🥔"
    },
    {
      id: "pack-04",
      name: "Crisp Green Chilli Bundle (500g)",
      farm: "Farmer Srinivas, Shadnagar",
      price: 35,
      harvested: "Harvested Today 05:30 AM",
      rating: 4.9,
      reviews: 41,
      image: "🌶️"
    }
  ];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.pack.price * item.quantity, 0);

  const addToCart = (pack: ConsumerPack) => {
    setCart(prev => {
      const existing = prev.find(item => item.pack.id === pack.id);
      if (existing) {
        return prev.map(item =>
          item.pack.id === pack.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { pack, quantity: 1 }];
    });
  };

  const updateQuantity = (packId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.pack.id === packId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setOrderPlaced(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Consumer Banner */}
      <div className="bg-gradient-to-r from-[#2E6B39] to-[#3E6B44] text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold font-serif">KisanConnect Consumer Marketplace</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D69A2D] text-black font-semibold">100% Farm Traceable</span>
          </div>
          <p className="text-xs text-white/80">Direct from local smallholder farms to your doorstep with guaranteed same-day freshness.</p>
        </div>

        {/* Clickable Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-3 bg-white/10 hover:bg-white/20 active:scale-95 transition-all px-4 py-2.5 rounded-xl border border-white/20 text-xs shrink-0 cursor-pointer shadow-sm"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#D69A2D]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D69A2D] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span>Basket: <b>{totalItems} items</b> (₹{subtotal})</span>
          <span className="ml-1 text-[11px] underline text-[#D69A2D] font-bold">View Cart &rarr;</span>
        </button>
      </div>

      {/* Produce Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {consumerPacks.map((pack) => {
          const inCart = cart.find(c => c.pack.id === pack.id);
          return (
            <div key={pack.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs hover:border-[#2E6B39]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-3">{pack.image}</div>
                <div className="flex items-center gap-1 text-[11px] text-[#D69A2D] font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{pack.rating}</span>
                  <span className="text-gray-400 font-normal">({pack.reviews} reviews)</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1C2B19] mb-1">{pack.name}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#2E6B39] shrink-0" />
                  <span className="truncate">{pack.farm}</span>
                </p>
                <div className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBF4ED] text-[#2E6B39] font-medium inline-block mb-3">
                  {pack.harvested}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-base font-bold text-[#1C2B19]">₹{pack.price}</span>
                {inCart ? (
                  <div className="flex items-center gap-2 bg-[#EBF4ED] px-2 py-1 rounded-lg border border-[#2E6B39]/30">
                    <button
                      onClick={() => updateQuantity(pack.id, -1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-white text-[#2E6B39] hover:bg-gray-100 text-xs font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-[#2E6B39]">{inCart.quantity}</span>
                    <button
                      onClick={() => updateQuantity(pack.id, 1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-[#2E6B39] text-white hover:bg-[#23532c] text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(pack)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2E6B39] hover:bg-[#23532c] text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#2E6B39]" />
                <h3 className="font-serif font-bold text-lg text-[#1C2B19]">Your Fresh Basket</h3>
                <span className="text-xs bg-[#EBF4ED] text-[#2E6B39] px-2 py-0.5 rounded-full font-bold">
                  {totalItems} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 py-4 space-y-3 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30 text-[#2E6B39]" />
                  <p className="text-sm font-medium">Your basket is empty</p>
                  <p className="text-xs text-gray-400 mt-1">Add fresh farm produce directly from verified farmers!</p>
                </div>
              ) : (
                cart.map(({ pack, quantity }) => (
                  <div key={pack.id} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pack.image}</span>
                      <div>
                        <h4 className="text-xs font-bold text-[#1C2B19]">{pack.name}</h4>
                        <p className="text-[10px] text-gray-500">{pack.farm}</p>
                        <span className="text-xs font-bold text-[#2E6B39]">₹{pack.price} each</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(pack.id, -1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(pack.id, 1)}
                        className="w-6 h-6 rounded-md bg-[#2E6B39] text-white flex items-center justify-center text-xs hover:bg-[#23532c]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#1C2B19] ml-2 w-12 text-right">
                        ₹{pack.price * quantity}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bill Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Produce Subtotal:</span>
                    <span className="font-semibold text-gray-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <span>Farm-to-Door Delivery:</span>
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.2 rounded font-bold">FREE</span>
                    </span>
                    <span className="text-green-700 font-semibold">₹0</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-bold text-[#1C2B19]">
                    <span>Total Amount:</span>
                    <span className="text-[#2E6B39]">₹{subtotal}</span>
                  </div>
                </div>

                <div className="bg-[#EBF4ED] p-2.5 rounded-lg flex items-center gap-2 text-[11px] text-[#2E6B39]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% of payment goes directly to the farmer without middleman commission.</span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3 bg-[#2E6B39] hover:bg-[#23532c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout (₹{subtotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout & Direct UPI Payment Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            {orderPlaced ? (
              <div className="text-center py-8 space-y-3 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-[#EBF4ED] text-[#2E6B39] rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1C2B19]">Order Confirmed!</h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">
                  Your produce is being freshly packed at the Shamshabad FPO cluster and will be delivered by tomorrow morning.
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-left text-xs space-y-1 font-mono text-gray-700">
                  <p>Order ID: <b>ORD-KC-{Math.floor(100000 + Math.random() * 900000)}</b></p>
                  <p>Amount Paid: <b>₹{subtotal}</b> ({paymentMethod.toUpperCase()})</p>
                  <p>Farmer Direct Credit: <b>100% Guaranteed</b></p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <h3 className="font-serif font-bold text-lg text-[#1C2B19]">Confirm Farm Delivery</h3>
                  <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Delivery Address */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2E6B39]" />
                    <span>Delivery Address</span>
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-[#2E6B39]"
                  />
                </div>

                {/* Payment Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">Payment Option</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 ${
                        paymentMethod === 'upi' ? 'border-[#2E6B39] bg-[#EBF4ED] font-bold text-[#2E6B39]' : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <span>📱</span>
                      <div>
                        <div>UPI / QR Instant</div>
                        <div className="text-[10px] text-gray-500 font-normal">GPay / PhonePe / Paytm</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 ${
                        paymentMethod === 'cod' ? 'border-[#2E6B39] bg-[#EBF4ED] font-bold text-[#2E6B39]' : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <span>💵</span>
                      <div>
                        <div>Cash on Delivery</div>
                        <div className="text-[10px] text-gray-500 font-normal">Pay when delivered</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>{totalItems} items in Basket:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#1C2B19] pt-1 border-t border-gray-200">
                    <span>Final Payable:</span>
                    <span className="text-[#2E6B39]">₹{subtotal}</span>
                  </div>
                </div>

                {/* Confirm Action */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 rounded-xl bg-[#2E6B39] hover:bg-[#23532c] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Place Order (₹{subtotal})</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
