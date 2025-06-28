import { toast } from 'react-toastify';

class ArtistService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'artist';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "bio" } },
          { field: { Name: "location" } },
          { field: { Name: "website" } },
          { field: { Name: "instagram" } },
          { field: { Name: "facebook" } },
          { field: { Name: "twitter" } },
          { field: { Name: "youtube" } },
          { field: { Name: "profile_image_url" } },
          { field: { Name: "cover_image_url" } },
          { field: { Name: "is_verified" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching artists:", error);
      toast.error("Failed to load artists");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "bio" } },
          { field: { Name: "location" } },
          { field: { Name: "website" } },
          { field: { Name: "instagram" } },
          { field: { Name: "facebook" } },
          { field: { Name: "twitter" } },
          { field: { Name: "youtube" } },
          { field: { Name: "profile_image_url" } },
          { field: { Name: "cover_image_url" } },
          { field: { Name: "is_verified" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching artist with ID ${id}:`, error);
      toast.error("Failed to load artist");
      return null;
    }
  }

  async create(artistData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Name: artistData.Name,
        email: artistData.email,
        phone: artistData.phone,
        bio: artistData.bio,
        location: artistData.location,
        website: artistData.website,
        instagram: artistData.instagram,
        facebook: artistData.facebook,
        twitter: artistData.twitter,
        youtube: artistData.youtube,
        profile_image_url: artistData.profile_image_url,
        cover_image_url: artistData.cover_image_url,
        is_verified: artistData.is_verified || false
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Artist created successfully");
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating artist:", error);
      toast.error("Failed to create artist");
      return null;
    }
  }

  async update(id, updateData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Id: id,
        Name: updateData.Name,
        email: updateData.email,
        phone: updateData.phone,
        bio: updateData.bio,
        location: updateData.location,
        website: updateData.website,
        instagram: updateData.instagram,
        facebook: updateData.facebook,
        twitter: updateData.twitter,
        youtube: updateData.youtube,
        profile_image_url: updateData.profile_image_url,
        cover_image_url: updateData.cover_image_url,
        is_verified: updateData.is_verified
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("Artist updated successfully");
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating artist:", error);
      toast.error("Failed to update artist");
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("Artist deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting artist:", error);
      toast.error("Failed to delete artist");
      return false;
    }
  }
}

export const artistService = new ArtistService();