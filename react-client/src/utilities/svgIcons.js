import React from "react";

export const getSettingsTabsSvgIcon = (iconColor: string, iconIndex: number) =>
{
    let icons = [<svg key={0} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill={iconColor}>
                     <path d="M0 0h24v24H0z" fill="none"/>
                     <path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"/>
                 </svg>,
                 <svg key={1} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill={iconColor}>
                     <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                     <path d="M0 0h24v24H0z" fill="none"/>
                 </svg>,
                 <svg key={2} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill={iconColor}>
                     <path d="M16.5 24C20.64 24 24 20.04 24 15.16C24 10.27 20.64 6.31 16.5 6.31C15.48 6.31 14.52 6.55 13.63 6.98C14.25 8.23 19.17 18.28 19.78 19.54C19.82 19.62 19.79 19.69 19.71 19.69C19.07 19.69 15.85 19.69 10.06 19.69C12.53 22.57 14.68 24 16.5 24Z"/>
                     <path d="M0.02 18.29C-0.02 18.36 0.01 18.42 0.08 18.42C1.86 18.42 16.14 18.42 17.92 18.42C17.99 18.42 18.02 18.36 17.98 18.29C17.09 16.46 9.96 1.88 9.07 0.06C9.03 -0.02 8.97 -0.01 8.93 0.06C7.15 3.71 0.91 16.46 0.02 18.29Z"/>
                 </svg>,
                 <svg key={3} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill={iconColor}>
                     <path d="M0 0h24v24H0z" fill="none"/>
                     <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                 </svg>,
                 <svg key={4} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 21 24" fill={iconColor}>
                     <path d="M0 19.2L9.6 24L9.6 11.46L0 6.66L0 19.2Z"/>
                     <path d="M1.29 4.73L10.75 9.46L20.21 4.73L10.75 0L1.29 4.73Z"/>
                     <path d="M11.9 24L21.5 19.2L21.5 6.66L11.9 11.46L11.9 24Z"/>
                 </svg>];

    return icons[iconIndex];
};