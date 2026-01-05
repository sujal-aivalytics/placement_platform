import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PageHeader } from "@/components/dashboard/page-header";
import { User, Mail, Phone, MapPin, Shield, Key, GraduationCap, Briefcase } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Mock initial of name for avatar fallback
  const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="My Profile"
        description="Manage your account settings and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: User Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="unstop-card overflow-hidden text-center border-t-4 border-t-primary">
            <div className="h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative">
              <div className="absolute inset-0 bg-grid-white/10" />
            </div>
            <div className="relative -mt-16 mb-4 flex justify-center">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardHeader className="pt-0">
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2 mt-1">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="capitalize">{user?.role || 'Student'}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono">85%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg Score</div>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono">12</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Tests</div>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Change Avatar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full justify-start h-12 p-1 bg-muted/50 backdrop-blur rounded-xl mb-6">
              <TabsTrigger value="personal" className="flex-1 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Personal</TabsTrigger>
              <TabsTrigger value="academic" className="flex-1 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Academic</TabsTrigger>
              <TabsTrigger value="security" className="flex-1 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="unstop-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Full Name</Label>
                      <Input id="firstName" defaultValue={user?.name || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="email" className="pl-9" defaultValue={user?.email || ''} disabled />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" className="pl-9" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="location" className="pl-9" placeholder="Mumbai, India" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us a little about yourself"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              <Card className="unstop-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Academic Details
                  </CardTitle>
                  <CardDescription>Your educational background for placement eligibility.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>10th Percentage</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label>12th Percentage</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Graduation CGPA</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Active Backlogs</Label>
                      <Input type="number" defaultValue="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gap Years</Label>
                      <Input type="number" defaultValue="0" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Update Academic Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="unstop-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your password and security preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">New Password</Label>
                    <Input id="new" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm New Password</Label>
                    <Input id="confirm" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive">Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
