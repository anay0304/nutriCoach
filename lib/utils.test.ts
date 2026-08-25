import {describe, expect, it} from 'vitest';
import { cn } from './utils';

describe('cn', () => { //combines tests about the cn function
    
    it('combines class names correctly', () => {
        //Arrange
        const className1 = 'p-2';
    const className2 = 'bg-red-500';
    
    //Act
    const result = cn(className1, className2);
    
    //Assert
    expect(result).toBe('p-2 bg-red-500');
});

it('keeps the latter conflicting class name', () => {
    //Arrange
    const className1 = 'p-2';
    const className2 = 'p-4';

    //Act
    const result = cn(className1, className2);

    //Assert
    expect(result).toBe('p-4');
});

});
