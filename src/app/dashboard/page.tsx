import { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard | FSRP',
  description: 'Florida State Roleplay - Dashboard',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
