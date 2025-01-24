import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Youtube, Instagram, Facebook, Share2, RefreshCw, Settings2, BarChart3, History } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { BeatsTable } from "@/components/BeatsTable"

interface SocialConfig {
  platform: string
  api_key: string
  api_secret?: string
  access_token?: string
  refresh_token?: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [configs, setConfigs] = useState<SocialConfig[]>([])
  const [analyticsData, setAnalyticsData] = useState({
    totalShares: 0,
    totalViews: 0,
    platformEngagement: {}
  })

  useEffect(() => {
    checkAuth()
    loadConfigs()
    loadAnalytics()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/')
    }
  }

  const loadConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from('social_media_config')
        .select('*')
      
      if (error) throw error
      setConfigs(data || [])
    } catch (error) {
      console.error('Error loading configs:', error)
      toast.error('Failed to load social media configurations')
    }
  }

  const loadAnalytics = async () => {
    // Simulated analytics data - replace with real API calls
    setAnalyticsData({
      totalShares: 156,
      totalViews: 2890,
      platformEngagement: {
        youtube: 45,
        instagram: 65,
        facebook: 28,
        tiktok: 18
      }
    })
  }

  const handleSaveConfig = async (platform: string, formData: any) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('social_media_config')
        .upsert({
          platform,
          ...formData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })

      if (error) throw error
      toast.success(`${platform} configuration saved successfully`)
      loadConfigs()
    } catch (error) {
      console.error('Error saving config:', error)
      toast.error(`Failed to save ${platform} configuration`)
    } finally {
      setLoading(false)
    }
  }

  const refreshTokens = async (platform: string) => {
    toast.info(`Refreshing ${platform} tokens...`)
    // Implement token refresh logic here
  }

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Dashboard
        </h1>
        <Button onClick={() => navigate('/')} variant="outline">
          Back to Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Total Shares</CardTitle>
            <CardDescription>Across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-neon-purple">
              {analyticsData.totalShares}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Total Views</CardTitle>
            <CardDescription>Combined viewership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-neon-blue">
              {analyticsData.totalViews}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Active Beats</CardTitle>
            <CardDescription>Currently shared</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-neon-orange">12</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Success Rate</CardTitle>
            <CardDescription>Share completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">98%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="youtube" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="youtube" className="data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/20">
            <Youtube className="w-5 h-5 mr-2 text-youtube" />
            YouTube
          </TabsTrigger>
          <TabsTrigger value="instagram" className="data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/20">
            <Instagram className="w-5 h-5 mr-2 text-instagram" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="facebook" className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/20">
            <Facebook className="w-5 h-5 mr-2 text-facebook" />
            Facebook
          </TabsTrigger>
          <TabsTrigger value="tiktok" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-900/20">
            <Share2 className="w-5 h-5 mr-2 text-tiktok" />
            TikTok
          </TabsTrigger>
        </TabsList>

        {['youtube', 'instagram', 'facebook', 'tiktok'].map((platform) => (
          <TabsContent key={platform} value={platform}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {platform === 'youtube' && <Youtube className="text-youtube" />}
                  {platform === 'instagram' && <Instagram className="text-instagram" />}
                  {platform === 'facebook' && <Facebook className="text-facebook" />}
                  {platform === 'tiktok' && <Share2 className="text-tiktok" />}
                  {platform.charAt(0).toUpperCase() + platform.slice(1)} Configuration
                </CardTitle>
                <CardDescription>
                  Manage your {platform} API credentials and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`${platform}-api-key`}>API Key</Label>
                    <Input
                      id={`${platform}-api-key`}
                      type="password"
                      placeholder="Enter API key"
                      defaultValue={configs.find(c => c.platform === platform)?.api_key}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`${platform}-api-secret`}>API Secret</Label>
                    <Input
                      id={`${platform}-api-secret`}
                      type="password"
                      placeholder="Enter API secret"
                      defaultValue={configs.find(c => c.platform === platform)?.api_secret}
                    />
                  </div>
                  {(platform === 'youtube' || platform === 'facebook') && (
                    <div className="grid gap-2">
                      <Label htmlFor={`${platform}-refresh-token`}>Refresh Token</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`${platform}-refresh-token`}
                          type="password"
                          placeholder="Refresh token"
                          defaultValue={configs.find(c => c.platform === platform)?.refresh_token}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          onClick={() => refreshTokens(platform)}
                          className="flex-shrink-0"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button
                    onClick={() => handleSaveConfig(platform, {
                      api_key: (document.getElementById(`${platform}-api-key`) as HTMLInputElement).value,
                      api_secret: (document.getElementById(`${platform}-api-secret`) as HTMLInputElement).value,
                      refresh_token: (document.getElementById(`${platform}-refresh-token`) as HTMLInputElement)?.value
                    })}
                    disabled={loading}
                  >
                    <Settings2 className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-6 h-6" />
            Recent Beats
          </CardTitle>
          <CardDescription>
            View and manage your recently uploaded beats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BeatsTable />
        </CardContent>
      </Card>
    </div>
  )
}