import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Key,
  MoreVertical,
  CheckCircle,
  XCircle,
  Download,
  AlertCircle
} from 'lucide-react';
import { USER_DIRECTORY } from '../../data/mockData';
import { UserAccount } from '../../types';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>(USER_DIRECTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'STUDENT' | 'FACULTY'>('ALL');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'STUDENT' | 'FACULTY'>('STUDENT');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.universityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.systemRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
    setToastMessage('User credential permissions updated in Active Directory.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      universityId: newUserRole === 'STUDENT' ? `CS-2024-${Math.floor(800 + Math.random() * 100)}` : `FAC-2024-${Math.floor(100 + Math.random() * 100)}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole === 'STUDENT' ? 'STUDENT' : 'FACULTY / ASST. PROF',
      systemRole: newUserRole,
      department: 'Dept. of Computer Science & Eng.',
      cohort: newUserRole === 'STUDENT' ? 'Semester 5 • Sec A' : 'Appointed Faculty',
      accessScope: newUserRole === 'STUDENT' ? 'Enrolled: 5 Core Subjects' : 'Assigned: Core Courses',
      status: 'active',
      lastActivity: 'Never',
      twoFactorEnabled: true,
    };

    setUsers([newUser, ...users]);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    setToastMessage(`Account created for ${newUserName} (${newUser.universityId})`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              User Directory & Identity Governance
            </h1>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-mono font-bold text-blue-800">
              1,548 Identities
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            RBAC Authorization, SSO Provisioning & Credential Lifecycles (PRD SEC-08)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center space-x-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs"
          >
            <UserPlus className="h-3.5 w-3.5 text-white" />
            <span>Provision User Identity</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-medium text-emerald-800 flex items-center space-x-2 shadow-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, roll ID, email, department..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          {(['ALL', 'STUDENT', 'FACULTY'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                roleFilter === r
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r === 'ALL' ? 'All Roles' : `${r}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">University ID</th>
                <th className="py-3 px-4">User Identity</th>
                <th className="py-3 px-4">System Role</th>
                <th className="py-3 px-4">Department & Cohort</th>
                <th className="py-3 px-4">Authorization Scope</th>
                <th className="py-3 px-4">2FA Status</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => {
                const isActive = user.status === 'active';
                const isUnderReview = user.status === 'under_review';
                const isRevoked = user.status === 'revoked';

                return (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {user.universityId}
                    </td>

                    <td className="py-3 px-4">
                      <div>
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-500">{user.email}</div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold font-mono ${
                        user.systemRole === 'STUDENT'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-800">{user.department}</div>
                      <div className="text-[10px] text-slate-400">{user.cohort}</div>
                    </td>

                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {user.accessScope}
                    </td>

                    <td className="py-3 px-4">
                      {user.twoFactorEnabled ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 font-semibold text-[11px]">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Enforced</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-amber-700 font-medium text-[11px]">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : isUnderReview
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {user.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`rounded px-2.5 py-1 text-[11px] font-bold transition ${
                          isActive
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {isActive ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Provision New User Identity
            </h3>

            <form onSubmit={handleAddUser} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. maya.lin@campus.edu"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">User Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="STUDENT">Student (Undergraduate)</option>
                  <option value="FACULTY">Faculty Member (Instructor)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 transition"
                >
                  Create & Dispatch SSO Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
