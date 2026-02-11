import React, { useState, useEffect } from "react";
import { apiService, handleApiError } from "../services/api";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getContacts();
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiService.getDashboardAnalytics();
      if (response.data.success) {
        setStats(response.data.data.contacts);
      }
    } catch (err) {
      console.error("Error fetching stats:", handleApiError(err));
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await apiService.updateContact(id, status);
      fetchContacts(); // Refresh contacts list
    } catch (err) {
      console.error("Error updating contact:", handleApiError(err));
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await apiService.deleteContact(id);
        fetchContacts(); // Refresh contacts list
      } catch (err) {
        console.error("Error deleting contact:", handleApiError(err));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Messages</h3>
              <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Recent (30 days)</h3>
              <p className="text-3xl font-bold text-green-400">
                {stats.recent}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">This Week</h3>
              <p className="text-3xl font-bold text-yellow-400">
                {stats.weekly}
              </p>
            </div>
          </div>
        )}

        {/* Contact Messages */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Subject</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="p-3">{contact.name}</td>
                    <td className="p-3">{contact.email}</td>
                    <td className="p-3">{contact.subject}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          contact.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : contact.status === "read"
                              ? "bg-blue-500 text-white"
                              : "bg-green-500 text-white"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        >
                          View
                        </button>
                        <select
                          value={contact.status}
                          onChange={(e) =>
                            updateContactStatus(contact._id, e.target.value)
                          }
                          className="px-2 py-1 bg-gray-700 rounded text-xs"
                        >
                          <option value="pending">Pending</option>
                          <option value="read">Read</option>
                          <option value="responded">Responded</option>
                        </select>
                        <button
                          onClick={() => deleteContact(contact._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Message Details</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <strong>Name:</strong> {selectedContact.name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedContact.email}
                </div>
                <div>
                  <strong>Subject:</strong> {selectedContact.subject}
                </div>
                <div>
                  <strong>Message:</strong>
                  <div className="mt-2 p-3 bg-gray-700 rounded">
                    {selectedContact.message}
                  </div>
                </div>
                <div>
                  <strong>Status:</strong> {selectedContact.status}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
