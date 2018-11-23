import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    // {
    //     path: '', title: 'Personal', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    // },
    // {
    //     path: '/dashboard', title: 'Dashboards', icon: 'mdi mdi-gauge', class: '', label: '4', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
    //     submenu: [
    //         { path: '/dashboard/dashboard1', title: 'Modern', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    //         { path: '/dashboard/dashboard2', title: 'Classic', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    //         { path: '/dashboard/dashboard3', title: 'Analytical', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    //     ]
    // },
    {
        path: '/campaign', title: 'Campaigns', icon: 'mdi mdi-bullhorn', class: '', label: '', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
        submenu: [
            // { path: '/dashboard/dashboard1', title: 'Modern', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            // { path: '/dashboard/dashboard2', title: 'Classic', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            // { path: '/dashboard/dashboard3', title: 'Analytical', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },
    
    {
        path: '/reports', title: 'Reports', icon: 'mdi mdi-clipboard-text', class: '', label: '', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
        submenu: [
            // { path: '/dashboard/dashboard1', title: 'Modern', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            // { path: '/dashboard/dashboard2', title: 'Classic', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            // { path: '/dashboard/dashboard3', title: 'Analytical', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },
   
    
];

