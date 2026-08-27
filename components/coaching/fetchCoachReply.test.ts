import { fetchCoachReply } from './fetchCoachReply';
import { afterEach, describe, it, expect, vi} from 'vitest';
import type { Message } from '@/types';

describe('fetchCoachReply', () => {
    afterEach(() => {
            vi.unstubAllGlobals();
        });
    it('should fetch coach reply', async () => {
        //Arrange
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ 
                text: 'Coach reply fetched successfully' })
        }); 

        vi.stubGlobal('fetch', mockFetch);
        //Act
        const messages: Message[] = [{ 
            role: 'user',
            text: 'How can I improve my diet?' 
        }];
        const result = await fetchCoachReply(messages);
        
        //Assert
        expect(result).toBe('Coach reply fetched successfully');
        expect(mockFetch).toHaveBeenCalledWith("/api/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({messages})
        })
        
    });
    it('should handle fetch error', async () => {
        //Arrange
        const mockFetch = vi.fn().mockResolvedValue({
            ok: false,
        }); 

        vi.stubGlobal('fetch', mockFetch);
        //Act & Assert
        await expect(fetchCoachReply([])).rejects.toThrow('Coach reply failed');
        
    });
});

