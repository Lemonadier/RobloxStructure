import React from 'react';

const iconProps = {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as "round",
    strokeLinejoin: "round" as "round",
};

export const ClientIcon = () => <svg {...iconProps}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
export const SharedIcon = () => <svg {...iconProps}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
export const ServerIcon = () => <svg {...iconProps}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
export const ServiceIcon = () => <svg {...iconProps}><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.5A4.5 4.5 0 0 0 17.5 5c-.58 0-1.13.1-1.64.29a2 2 0 0 1-1.92 0A4.42 4.42 0 0 0 12.5 5 4.5 4.5 0 0 0 8 9.5c0 4.5 3 12.5 6 12.5s2.5-1.06 4-1.06Z"/><path d="M12 2.25c-1.5 0-2.75-1.06-4-1.06-3 0-6 8-6 12.5A4.5 4.5 0 0 1 6.5 19c.58 0 1.13-.1 1.64-.29a2 2 0 0 0 1.92 0A4.42 4.42 0 0 1 11.5 19a4.5 4.5 0 0 1 4.5-4.5c0-4.5-3-12.5-6-12.5s-2.5 1.06-4 1.06Z"/></svg>;
