import { format } from 'date-fns';

// Format date to 'Month Day, Year' (e.g., 'July 7, 2023')
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

// Format date to 'Month Day, Year' (e.g., 'July 7, 2023')
export const formatShortDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export default formatDate;