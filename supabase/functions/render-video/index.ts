import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { videoId } = await req.json()
    console.log('Received request to render video:', videoId)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Simulate video rendering process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Update video status to 'rendering'
    const { error: updateError } = await supabase
      .from('videos')
      .update({ render_status: 'rendering' })
      .eq('id', videoId)

    if (updateError) {
      console.error('Error updating video status:', updateError)
      throw updateError
    }

    console.log('Updated video status to rendering')

    // Simulate the actual rendering process with progress updates
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update progress in the database
      const { error: progressError } = await supabase
        .from('videos')
        .update({ render_status: `rendering:${progress}` })
        .eq('id', videoId)

      if (progressError) {
        console.error('Error updating progress:', progressError)
        throw progressError
      }

      console.log('Updated render progress:', progress)
    }

    // Generate a mock video URL (in production this would be a real rendered video)
    const videoUrl = `https://example.com/rendered-video-${videoId}.mp4`

    // Update the video record with the final URL and completed status
    const { error: finalError } = await supabase
      .from('videos')
      .update({ 
        render_status: 'completed',
        video_url: videoUrl
      })
      .eq('id', videoId)

    if (finalError) {
      console.error('Error updating final status:', finalError)
      throw finalError
    }

    console.log('Video rendering completed:', videoUrl)

    return new Response(
      JSON.stringify({ 
        message: 'Video rendered successfully',
        videoUrl 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    )

  } catch (error) {
    console.error('Error in render-video function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    )
  }
})