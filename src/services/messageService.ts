// services/messageService.ts
import pb from '@/lib/pocketbase';

export const sendMessage = async (messageData: {
  recipient: string;
  content: string;
  relatedProduct?: string;
}) => {
  console.group('Attempting to send message');
  try {
    // 1. Verify authentication state
    console.log('Current auth state:', {
      isValid: pb.authStore.isValid,
      token: pb.authStore.token,
      model: pb.authStore.model
    });

    if (!pb.authStore.isValid) {
      console.warn('Not authenticated - attempting refresh');
      try {
        await pb.collection('users').authRefresh();
        console.log('Auth refresh successful');
      } catch (refreshError) {
        console.error('Auth refresh failed:', refreshError);
        throw new Error('Session expired. Please login again.');
      }
    }

    // 2. Validate required fields
    if (!messageData.recipient) {
      throw new Error('Recipient is required');
    }
    if (!messageData.content) {
      throw new Error('Message content is required');
    }

    // 3. Prepare record data
    const recordData = {
      sender: pb.authStore.model?.id,
      recipient: messageData.recipient,
      content: messageData.content,
      status: 'pending',
      ...(messageData.relatedProduct && { relatedProduct: messageData.relatedProduct })
    };

    console.log('Creating message with data:', recordData);

    // 4. Attempt record creation
    const record = await pb.collection('messages').create(recordData);
    console.log('Message created successfully:', record);
    return record;
  } catch (error) {
    console.error('Failed to create message:', {
      error,
      inputData: messageData,
      authState: pb.authStore
    });
    throw error;
  } finally {
    console.groupEnd();
  }
};