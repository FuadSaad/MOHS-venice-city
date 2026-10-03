"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Plus, Edit2, Trash2, X, Loader2, CheckCircle2 } from "lucide-react";
import { ReviewItem } from "@/types/property";
import { useRouter } from "next/navigation";

interface Props {
  initialReviews: ReviewItem[];
}

export default function AdminReviewsClient({ initialReviews }: Props) {
  const router = useRouter();
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    roleOrLocation: "",
    rating: 5,
    comment: "",
    avatarUrl: "",
    propertyPurchased: "",
    isApproved: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingReview(null);
    setFormData({
      name: "",
      roleOrLocation: "",
      rating: 5,
      comment: "",
      avatarUrl: "",
      propertyPurchased: "",
      isApproved: true,
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (review: ReviewItem) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      roleOrLocation: review.roleOrLocation,
      rating: review.rating,
      comment: review.comment,
      avatarUrl: review.avatarUrl || "",
      propertyPurchased: review.propertyPurchased || "",
      isApproved: review.isApproved,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = editingReview 
        ? `/api/admin/reviews/${editingReview.id}` 
        : "/api/admin/reviews";
      
      const method = editingReview ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        if (editingReview) {
          setReviews(reviews.map((r) => (r.id === editingReview.id ? data.review : r)));
        } else {
          setReviews([data.review, ...reviews]);
        }
        setIsModalOpen(false);
        router.refresh();
      } else {
        setError(data.error || "Failed to save review");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.filter((r) => r.id !== id));
        setDeleteId(null);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-[#657278] mt-1">
            Verified reviews displayed on the homepage trust section.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#00695C] hover:bg-[#004d40] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          No reviews found. Click "Add New Review" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#E2E7E5] shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow"
            >
              {/* Action Buttons (visible on hover) */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(rev)}
                  className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors border border-emerald-100"
                  title="Edit Review"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(rev.id)}
                  className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors border border-rose-100"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#D6A84F] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D6A84F]" />
                  ))}
                </div>
                <p className="text-sm text-[#12262D] italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <Image
                    src={
                      rev.avatarUrl ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    }
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#12262D] flex items-center gap-1">
                    {rev.name}
                    {rev.isApproved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </p>
                  <p className="text-xs text-[#657278]">{rev.roleOrLocation}</p>
                  {rev.propertyPurchased && (
                    <p className="text-[11px] text-[#00695C] font-semibold mt-0.5">
                      {rev.propertyPurchased}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Review?</h3>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto sidebar-scrollbar relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#12262D] mb-6">
                {editingReview ? "Edit Review" : "Add New Review"}
              </h2>

              {error && (
                <div className="p-3 mb-6 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Reviewer Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Role / Location</label>
                    <input
                      required
                      type="text"
                      value={formData.roleOrLocation}
                      onChange={(e) => setFormData({ ...formData, roleOrLocation: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all"
                      placeholder="e.g. Plot Owner, Sector 3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Rating (1-5)</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all bg-white"
                    >
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Star" : "Stars"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Property Purchased (Optional)</label>
                    <input
                      type="text"
                      value={formData.propertyPurchased}
                      onChange={(e) => setFormData({ ...formData, propertyPurchased: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all"
                      placeholder="e.g. 5 Katha Lake-Facing Plot"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Avatar Image URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-[10px] text-slate-500">Leave blank to use a default avatar.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Review Comment</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all resize-none"
                    placeholder="Write the customer's review here..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isApproved"
                    checked={formData.isApproved}
                    onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    className="w-4 h-4 text-[#00695C] rounded border-slate-300 focus:ring-[#00695C]"
                  />
                  <label htmlFor="isApproved" className="text-sm text-slate-700 font-medium cursor-pointer">
                    Approve and Display on Website
                  </label>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-[#00695C] hover:bg-[#004d40] rounded-xl shadow-sm transition-colors flex items-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingReview ? "Save Changes" : "Create Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
