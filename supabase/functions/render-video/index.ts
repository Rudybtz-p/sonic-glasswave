import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { videoId } = await req.json()

    if (!videoId) {
      throw new Error('Video ID is required')
    }

    // Update video status to processing
    const { error: updateError } = await supabaseClient
      .from('videos')
      .update({ render_status: 'processing' })
      .eq('id', videoId)

    if (updateError) {
      throw updateError
    }

    // Simulate video processing (replace with actual video processing logic)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Update video with completed status
    const { error: completeError } = await supabaseClient
      .from('videos')
      .update({ 
        render_status: 'completed',
        video_url: `https://example.com/processed-video-${videoId}.mp4`
      })
      .eq('id', videoId)

    if (completeError) {
      throw completeError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Video rendering completed',
        videoId 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})