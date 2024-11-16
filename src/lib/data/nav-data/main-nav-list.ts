import type { NavItem } from '../../../types/nav-item-type';

export const mainNavList: NavItem[] = [
	{
		href: '/home',
		label: 'Home'
	},
	{
		href: '/follow-along',
		label: 'Follow along'
	},
	{
		href: '/workout',
		label: 'Workouts'
	},
	{
		href: '/timer',
		label: 'Timers'
	},
	{
		href: '/routine',
		label: 'Routines'
	}
] as const;
