import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setIsAdmin(false)
          return
        }

        const { data: roles, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle()

        if (error) {
          console.error("Error checking admin status:", error)
          setIsAdmin(false)
        } else {
          setIsAdmin(!!roles?.role)
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        checkAdminStatus()
      } else if (event === "SIGNED_OUT") {
        setIsAdmin(false)
      }
    })

    checkAdminStatus()

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  return { isAdmin, loading }
}