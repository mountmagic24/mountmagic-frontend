'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types/service';
import { serviceService } from '@/services/serviceService';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import toast from 'react-hot-toast';

export default function ManageServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await serviceService.getAllServices();
      if (response.success) {
        setServices(response.data.services);
      }
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await serviceService.updateService(editingId, formData);
        toast.success('Service updated successfully!');
      } else {
        await serviceService.createService(formData);
        toast.success('Service created successfully!');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', description: '', price: 0, category: '' });
      loadServices();
    } catch (error) {
      toast.error('Failed to save service');
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      category: service.category,
    });
    setEditingId(service._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;

    try {
      await serviceService.deleteService(id);
      toast.success('Service deleted!');
      loadServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <AuthGuard requiredRole={['admin', 'taxi_manager']}>
      <DashboardLayout>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-mm-primary">Manage Services</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setEditingId(null);
                  setFormData({ title: '', description: '', price: 0, category: '' });
                }
              }}
              className="bg-mm-primary text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90"
            >
              {showForm ? 'Cancel' : 'Add Service'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Service Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary"
                />
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary mb-4"
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary mb-6"
              />

              <button
                type="submit"
                className="bg-mm-secondary text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : services.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No services yet</div>
            ) : (
              services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white p-6 rounded-lg shadow flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-mm-primary">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">{service.description}</p>
                    <p className="text-sm text-gray-500">
                      Category: {service.category} • Price: ${service.price}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-mm-accent text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-mm-error text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
