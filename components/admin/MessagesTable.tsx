'use client';

import { useState, useEffect } from 'react';
import MessageDetailModal from './MessageDetailModal';

interface ContactMessage {
  id: string;
  name: string;
  contact: string;
  message: string;
  isResolved: boolean;
  createdAt: string;
}

export default function MessagesTable() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setFilteredMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = [...messages];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter === 'RESOLVED') {
      filtered = filtered.filter((msg) => msg.isResolved);
    } else if (statusFilter === 'UNRESOLVED') {
      filtered = filtered.filter((msg) => !msg.isResolved);
    }

    setFilteredMessages(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, messages]);

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  // Mark as resolved/unresolved
  const handleToggleResolved = async (messageId: string, isResolved: boolean) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isResolved }),
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage({ ...selectedMessage, isResolved });
        }
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  // Delete message
  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-military-gold border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-military-muted">Loading messages...</p>
      </div>
    );
  }

  return (
    <>
      <div className="glass-card p-6 mb-6">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, contact, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field md:col-span-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="ALL">All Messages</option>
            <option value="UNRESOLVED">Unresolved</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-military-muted">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} of{' '}
            {filteredMessages.length} messages
          </div>
          <div className="flex gap-4">
            <span className="text-military-muted">
              <span className="font-semibold text-military-smoke">
                {messages.filter((m) => !m.isResolved).length}
              </span>{' '}
              Unresolved
            </span>
            <span className="text-military-muted">
              <span className="font-semibold text-military-smoke">
                {messages.filter((m) => m.isResolved).length}
              </span>{' '}
              Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-military-navy/50 border-b border-military-gold/20">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Message Preview
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {currentMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-military-muted">
                    No messages found
                  </td>
                </tr>
              ) : (
                currentMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {msg.isResolved ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-300 border border-green-500/50">
                          Resolved
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/50">
                          New
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-military-smoke">
                      {msg.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-military-muted">{msg.contact}</td>
                    <td className="px-6 py-4 text-sm text-military-muted max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-military-muted">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="text-military-gold hover:text-military-gold/80 font-semibold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="text-sm text-military-muted">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onToggleResolved={handleToggleResolved}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
