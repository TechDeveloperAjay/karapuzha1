"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import FormSection from "@/components/admin/FormSection";
import { dummySettings } from "@/data/settings";

export default function SettingsPage() {
  const [resortName, setResortName] = useState(dummySettings.resortName);
  const [contactEmail, setContactEmail] = useState(dummySettings.contactEmail);
  const [contactPhone, setContactPhone] = useState(dummySettings.contactPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(dummySettings.whatsappNumber);
  const [street, setStreet] = useState(dummySettings.address.street);
  const [city, setCity] = useState(dummySettings.address.city);
  const [state, setState] = useState(dummySettings.address.state);
  const [zipCode, setZipCode] = useState(dummySettings.address.zipCode);

  const [facebook, setFacebook] = useState(dummySettings.socialLinks?.facebook || "");
  const [instagram, setInstagram] = useState(dummySettings.socialLinks?.instagram || "");
  const [youtube, setYoutube] = useState(dummySettings.socialLinks?.youtube || "");

  const [checkInTime, setCheckInTime] = useState(dummySettings.bookingConfig.checkInTime);
  const [checkOutTime, setCheckOutTime] = useState(dummySettings.bookingConfig.checkOutTime);
  const [taxPercentage, setTaxPercentage] = useState(dummySettings.bookingConfig.taxPercentage);
  const [advancePaymentPercentage, setAdvancePaymentPercentage] = useState(dummySettings.bookingConfig.advancePaymentPercentage);

  const [metaTitle, setMetaTitle] = useState(dummySettings.seoConfig?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(dummySettings.seoConfig?.metaDescription || "");

  const [theme, setTheme] = useState("light");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Resort settings parameters saved successfully (local state bypass)!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto pb-16">
      <PageHeader 
        title="Resort settings console" 
        description="Configure resort profiles, coordinates, billing tax details, social networks, and page SEO parameters."
        actions={
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors"
          >
            <Save size={14} />
            <span>Save Settings</span>
          </button>
        }
      />

      <div className="space-y-1">
        {/* Section 1: General Info */}
        <FormSection 
          title="Resort Information" 
          description="Global resort descriptive metadata, contact hotlines, and address details."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Resort Profile Name</label>
              <input 
                type="text" 
                required 
                value={resortName} 
                onChange={(e) => setResortName(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Reservations Email</label>
              <input 
                type="email" 
                required 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Hotline Phone</label>
              <input 
                type="text" 
                required 
                value={contactPhone} 
                onChange={(e) => setContactPhone(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">WhatsApp Connect URL</label>
              <input 
                type="text" 
                required 
                value={whatsappNumber} 
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Street Address</label>
              <input 
                type="text" 
                required 
                value={street} 
                onChange={(e) => setStreet(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:col-span-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">City</label>
                <input 
                  type="text" 
                  required 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full px-2 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">State</label>
                <input 
                  type="text" 
                  required 
                  value={state} 
                  onChange={(e) => setState(e.target.value)}
                  className="block w-full px-2 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Zip Code</label>
                <input 
                  type="text" 
                  required 
                  value={zipCode} 
                  onChange={(e) => setZipCode(e.target.value)}
                  className="block w-full px-2 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-105 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </FormSection>

        {/* Section 2: Booking Rules */}
        <FormSection 
          title="Booking Configuration" 
          description="Check-in timings, default taxes rates, and billing details."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Default Check-In Time</label>
              <input 
                type="text" 
                required 
                value={checkInTime} 
                onChange={(e) => setCheckInTime(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Default Check-Out Time</label>
              <input 
                type="text" 
                required 
                value={checkOutTime} 
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Luxury GST/Tax Rate (%)</label>
              <input 
                type="number" 
                required 
                value={taxPercentage} 
                onChange={(e) => setTaxPercentage(Number(e.target.value))}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Advance Deposit Required (%)</label>
              <input 
                type="number" 
                required 
                value={advancePaymentPercentage} 
                onChange={(e) => setAdvancePaymentPercentage(Number(e.target.value))}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none"
              />
            </div>
          </div>
        </FormSection>

        {/* Section 3: Social links */}
        <FormSection 
          title="Social Link Integrations" 
          description="Profile urls for Facebook, Instagram, and YouTube."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Instagram Handle</label>
              <input 
                type="text" 
                value={instagram} 
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/profile"
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Facebook Page URL</label>
              <input 
                type="text" 
                value={facebook} 
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/page"
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">YouTube Channel URL</label>
              <input 
                type="text" 
                value={youtube} 
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/channel"
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none text-slate-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </FormSection>

        {/* Section 4: SEO metadata */}
        <FormSection 
          title="Search Engines SEO Metadata" 
          description="Configure dynamic title templates and metadata descriptions for Google searches."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Default Meta Title</label>
              <input 
                type="text" 
                value={metaTitle} 
                onChange={(e) => setMetaTitle(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Default Meta Description</label>
              <textarea 
                rows={3}
                value={metaDescription} 
                onChange={(e) => setMetaDescription(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none text-slate-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </FormSection>

        {/* Section 5: Branding & Theme */}
        <FormSection 
          title="Console Branding Theme" 
          description="Adjust layouts styling preferences and theme mode selections."
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 block">Default Theme Mode</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input 
                  type="radio" 
                  name="theme" 
                  value="light" 
                  checked={theme === "light"}
                  onChange={() => setTheme("light")}
                  className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <span>Light Clean Theme</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input 
                  type="radio" 
                  name="theme" 
                  value="dark" 
                  checked={theme === "dark"}
                  onChange={() => setTheme("dark")}
                  className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <span>Dark Luxury Theme</span>
              </label>
            </div>
          </div>
        </FormSection>
      </div>
    </form>
  );
}
