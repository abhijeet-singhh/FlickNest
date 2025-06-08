export const truncateText = (text: string, maxLength = 20): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

export const formatDate = (dateStr: string): string => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
};

export const formatRating = (rating?: number): string => {
    if (!rating) return 'N/A';
    return Number(rating).toFixed(1);
};

export const formatPopularity = (popularity?: number): string => {
    if (!popularity) return 'N/A';
    return `${Number(popularity).toFixed(0)}K`;
};