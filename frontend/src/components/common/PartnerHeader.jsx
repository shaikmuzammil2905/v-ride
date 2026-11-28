import React, { useState } from 'react';
import { Bell, Menu, LogOut, CheckCheck, X } from 'lucide-react';

/**
 * Unified V RIDE Partner Header shared across Rider, Vendor, and Admin panels.
 */
export const PartnerHeader = ({
  roleLabel = 'RIDER PARTNER',
  userName = 'Raju Kumar',
  rightSlot = null,
  notifications = [],
  onMarkAllRead,
  onToggleMenu,
  onLogout
}) => {
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="bg-[#10151F] text-white px-4 py-2.5 border-b border-white/10 flex items-center justify-between sticky top-0 z-30 h-14">
        <div className="flex items-center gap-2.5 min-w-0">
          {onToggleMenu && (
            <button
              type="button"
              onClick={onToggleMenu}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white active:scale-95 transition"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="w-8 h-8 rounded-lg bg-[#FFD000] text-[#10151F] flex items-center justify-center font-black text-base shrink-0 shadow-xs">
            V
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm tracking-wider text-white leading-none">V RIDE</span>
              <span className="text-[9px] font-black uppercase bg-[#FFD000]/20 text-[#FFD000] px-1.5 py-0.5 rounded">
                {roleLabel}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold truncate block mt-0.5">
              {userName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rightSlot}

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#FFD000] text-[#10151F] text-[9px] font-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="fixed sm:absolute right-3 left-3 sm:left-auto sm:w-80 top-14 sm:top-11 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="px-4 py-3 bg-[#10151F] text-white flex items-center justify-between">
                  <span className="text-xs font-black">Notifications ({unreadCount} unread)</span>
                  <div className="flex items-center gap-2">
                    {onMarkAllRead && (
                      <button
                        type="button"
                        onClick={onMarkAllRead}
                        className="text-[10px] font-bold text-[#FFD000] flex items-center gap-1 hover:underline"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Mark all read</span>
                      </button>
                    )}
                    <button type="button" onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-xs text-gray-500 text-center">No notifications yet</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={`p-3 text-xs ${n.read ? 'bg-white' : 'bg-yellow-50/70'}`}>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900">{n.title}</span>
                          <span className="text-[10px] text-gray-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-0.5">{n.desc}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-gray-200 hover:text-red-300 transition active:scale-95"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default PartnerHeader;
