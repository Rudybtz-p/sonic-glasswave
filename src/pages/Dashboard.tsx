import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { supabase } from "@/integrations/supabase/client"

type Platform = 'youtube' | 'instagram' | 'facebook' | 'tiktok'

interface SocialMediaConfig {
  platform: Platform
  api_key: string
  api_secret?: string
  access_token?: string
  refresh_token?: string
}

interface PlatformFormData {
  api_key: string
  api_secret?: string
  access_token?: string
  refresh_token?: string
}

const Dashboard = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  
  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/')
      }
    }
    checkAuth()
  }, [navigate])

  // Fetch existing configurations
  const { data: configs, refetch } = useQuery({
    queryKey: ['social-media-configs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_media_config')
        .select('*')
      
      if (error) throw error
      return data
    }
  })

  const platforms: Platform[] = ['youtube', 'instagram', 'facebook', 'tiktok']

  const PlatformForm = ({ platform }: { platform: Platform }) => {
    const form = useForm<PlatformFormData>({
      defaultValues: {
        api_key: '',
        api_secret: '',
        access_token: '',
        refresh_token: ''
      }
    })

    useEffect(() => {
      const config = configs?.find(c => c.platform === platform)
      if (config) {
        form.reset({
          api_key: config.api_key,
          api_secret: config.api_secret,
          access_token: config.access_token,
          refresh_token: config.refresh_token
        })
      }
    }, [configs, platform])

    const onSubmit = async (data: PlatformFormData) => {
      try {
        const { error } = await supabase
          .from('social_media_config')
          .upsert({
            platform,
            ...data
          })

        if (error) throw error

        toast({
          title: "Success",
          description: `${platform} configuration updated successfully`,
        })

        refetch()
      } catch (error) {
        console.error('Error saving configuration:', error)
        toast({
          title: "Error",
          description: "Failed to save configuration",
          variant: "destructive",
        })
      }
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="api_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="api_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Secret</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="access_token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Token</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="refresh_token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refresh Token</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save Configuration</Button>
        </form>
      </Form>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Social Media API Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <Card key={platform}>
            <CardHeader>
              <CardTitle className="capitalize">{platform}</CardTitle>
              <CardDescription>Configure your {platform} API credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformForm platform={platform} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard