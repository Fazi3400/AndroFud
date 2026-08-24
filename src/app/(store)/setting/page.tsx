"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getNameInitials } from "@/lib/utils";
import { getClient } from "@/lib/supabase/client";
import { Copy, Check, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
      });
      return;
    }

    setIsSaving(true);
    try {
      const supabaseClient = getClient();
      if (!supabaseClient) {
        toast({
          title: "Error",
          description: "Client not initialized",
        });
        setIsSaving(false);
        return;
      }
      const { error } = await supabaseClient.auth.updateUser({
        data: { name: formData.name },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        setIsEditing(false);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update profile",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user?.id || "");
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[#a855f7]">Profile</h1>
        <p className="text-[#67e8f9]">
          Manage and update your profile information
        </p>
      </div>

      {/* Avatar Card */}
      <div className="bg-gradient-to-br from-[#0d2818] to-black rounded-3xl p-8 border-2 border-[#0099ff]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-[#0099ff] shadow-lg">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-[#d8b4fe] to-[#285A48] text-[#a855f7]">
                {getNameInitials(formData.name || "User")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0099ff] rounded-full border-4 border-[#1a3a2e]"></div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-[#a855f7]">
              {formData.name || "User"}
            </h2>
            <p className="text-[#67e8f9] text-lg mt-1">{formData.email}</p>
            <p className="text-xs text-[#a855f7] font-medium mt-3">
              ✓ Account Verified
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="bg-[#0d2818] rounded-2xl border-2 border-[#0099ff] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-[#1a3a2e] to-[#285A48] px-8 py-6 border-b-2 border-[#0099ff]">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-[#a855f7]" />
            <div>
              <h3 className="text-lg font-bold text-[#a855f7]">
                Personal Information
              </h3>
              <p className="text-sm text-[#67e8f9] mt-1">
                Update your personal details
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Name Field */}
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-[#1a3a2e] dark:text-[#a855f7] block"
            >
              Full Name
            </label>
            {isEditing ? (
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="h-12 rounded-full border-2 border-[#0099ff] focus:border-[#d8b4fe] bg-[#1a3a2e] text-[#a855f7] placeholder-[#d8b4fe] text-lg"
              />
            ) : (
              <div className="h-12 px-4 rounded-full border-2 border-[#0099ff] bg-[#1a3a2e] flex items-center text-[#a855f7] font-medium">
                {formData.name || "Not set"}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#a855f7] block"
            >
              Email Address
            </label>
            <div className="h-12 px-4 rounded-full border-2 border-[#0099ff] bg-[#1a3a2e] flex items-center text-[#67e8f9] font-medium">
              {formData.email}
            </div>
            <p className="text-xs text-[#67e8f9]">
              Email cannot be changed here
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 h-11 rounded-full bg-[#d8b4fe] hover:bg-[#0099ff] text-white font-semibold"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.user_metadata?.name || "",
                      email: user.email || "",
                    });
                  }}
                  className="h-11 rounded-full border-2 border-[#0099ff] text-[#1a3a2e] dark:text-[#a855f7] hover:bg-[#f0f8f6] dark:hover:bg-[#1a3a2e]"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex-1 h-11 rounded-full bg-[#d8b4fe] hover:bg-[#0099ff] text-white font-semibold"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Account ID Card */}
      <div className="bg-[#0d2818] rounded-2xl border-2 border-[#0099ff] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-[#1a3a2e] to-[#285A48] px-8 py-6 border-b-2 border-[#0099ff]">
          <h3 className="text-lg font-bold text-[#a855f7]">Account ID</h3>
          <p className="text-sm text-[#67e8f9] mt-1">
            Your unique account identifier
          </p>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-2 bg-[#1a3a2e] rounded-full p-4 border-2 border-[#0099ff]">
            <code className="flex-1 text-sm font-mono text-[#a855f7] break-all">
              {user.id}
            </code>
            <button
              onClick={copyToClipboard}
              className="flex-shrink-0 p-2 hover:bg-[#0099ff] dark:hover:bg-[#0099ff] rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              {copiedId ? (
                <Check className="w-5 h-5 text-[#a855f7]" />
              ) : (
                <Copy className="w-5 h-5 text-[#67e8f9] hover:text-[#a855f7]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
