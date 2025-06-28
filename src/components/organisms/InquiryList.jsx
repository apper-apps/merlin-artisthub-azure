import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InquiryCard from "@/components/molecules/InquiryCard";
import SearchBar from "@/components/molecules/SearchBar";
import FilterModal from "@/components/molecules/FilterModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Icon from "@/components/ui/Icon";
import { inquiryService } from "@/services/api/inquiryService";

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    statuses: [],
    eventTypes: [],
    dateRange: null
  });

  const loadInquiries = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await inquiryService.getAll();
      setInquiries(data);
    } catch (err) {
      setError('Failed to load inquiries. Please try again.');
      console.error('Error loading inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const filteredInquiries = inquiries.filter(inquiry => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        inquiry.clientName.toLowerCase().includes(searchLower) ||
        inquiry.eventType.toLowerCase().includes(searchLower) ||
        inquiry.message.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(inquiry.status)) {
      return false;
    }

    // Event type filter
    if (filters.eventTypes.length > 0 && !filters.eventTypes.includes(inquiry.eventType)) {
      return false;
    }

    return true;
  });

  const hasActiveFilters = filters.statuses.length > 0 || filters.eventTypes.length > 0;

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadInquiries} />;
  if (inquiries.length === 0) return <Empty />;

  return (
    <div className="space-y-4">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search inquiries..."
        onFilterClick={() => setShowFilterModal(true)}
        hasActiveFilters={hasActiveFilters}
      />

{filteredInquiries.length === 0 && (searchTerm || hasActiveFilters) ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-3">
            {filteredInquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <InquiryCard inquiry={inquiry} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  );
};

export default InquiryList;