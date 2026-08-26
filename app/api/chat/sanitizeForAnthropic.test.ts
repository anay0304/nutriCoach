import {it, expect, describe} from 'vitest';
import {sanitizeForAnthropic} from './sanitizeForAnthropic';

describe('sanitizeForAnthropic', () => {
    it('empty input returns empty array', () => {
        //Arrange
        const input: { role: string; text: string }[] = [];
        //Act
        const result = sanitizeForAnthropic(input);
        //Assert
        expect(result).toEqual([]);

        //toEqual is used when comparing objects or arrays, 
        // as it checks for deep equality, 
        // while toBe checks for referential equality.
    });

    it('only coach messages returns empty array', () => {
        //Arrange
        const input = [
            { role: 'coach', text: 'Hello' },
            { role: 'coach', text: 'How are you?' },
        ];
        //Act
        const result = sanitizeForAnthropic(input);
        //Assert
        expect(result).toEqual([]);
    });

    it('consecutive coach messages are merged', () => {
        //Arrange
        const input = [
            { role: 'user', text: 'Hello' },
            { role: 'coach', text: 'How are you?' },
            { role: 'coach', text: 'I am fine.' },
        ];
        //Act
        const result = sanitizeForAnthropic(input);
        //Assert
        expect(result).toEqual([
            { role: 'user', content: 'Hello' },
            { role: 'assistant', content: 'How are you?\nI am fine.' },
        ]);
    });

    it('combined test: leading coach messages and consecutive same-role messages', () => {
        //Arrange
        const input = [
            { role: 'coach', text: 'Hello' },
            { role: 'coach', text: 'How are you?' },
            { role: 'user', text: 'I am fine.' },
            { role: 'user', text: 'Thanks for asking.' },
            { role: 'coach', text: 'Great!' },
        ];
        //Act
        const result = sanitizeForAnthropic(input);
        //Assert
        expect(result).toEqual([
            { role: 'user', content: 'I am fine.\nThanks for asking.' },
            { role: 'assistant', content: 'Great!' },
        ]);
    });

    it('ignores whitespace-only messages and merges consecutive same-role messages', () => {
        //Arrange
        const input = [
            { role: 'user', text: 'Hello' },
            { role: 'coach', text: '   ' },
            { role: 'user', text: 'How are you?' },
        ];
        //Act
        const result = sanitizeForAnthropic(input);
        //Assert
        expect(result).toEqual([
            { role: 'user', content: 'Hello\nHow are you?' },
        ]);
    });
        
});
