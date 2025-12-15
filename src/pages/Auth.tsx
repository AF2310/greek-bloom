import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, getRememberedUsername } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { createRateLimiter } from '@/lib/security';

const signUpSchema = z.object({
  username: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Name can only contain letters, numbers, and underscores'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const signInSchema = z.object({
  username: z.string().min(1, 'Name is required'),
  password: z.string().min(1, 'Password is required')
});

export default function Auth() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  
  // Rate limiter: max 5 attempts per 60 seconds
  const loginRateLimiter = useMemo(() => createRateLimiter(5, 60000), []);
  
  const [isLoading, setIsLoading] = useState(false);
  const [signUpForm, setSignUpForm] = useState({ username: '', password: '', rememberMe: false });
  const [signInForm, setSignInForm] = useState({ username: '', password: '', rememberMe: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

  // Load remembered username on mount
  useEffect(() => {
    const rememberedUsername = getRememberedUsername();
    if (rememberedUsername) {
      setSignInForm(prev => ({ ...prev, username: rememberedUsername, rememberMe: true }));
    }
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = signUpSchema.safeParse(signUpForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(signUpForm.username, signUpForm.password, signUpForm.rememberMe);
    setIsLoading(false);

    if (error) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Welcome!',
      description: 'Your account has been created successfully.'
    });
    navigate('/dashboard');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Check rate limit
    if (!loginRateLimiter()) {
      const waitTime = 60;
      setRateLimitedUntil(Date.now() + waitTime * 1000);
      toast({
        title: 'Too many attempts',
        description: `Please wait ${waitTime} seconds before trying again.`,
        variant: 'destructive'
      });
      return;
    }
    
    const result = signInSchema.safeParse(signInForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(signInForm.username, signInForm.password, signInForm.rememberMe);
    setIsLoading(false);

    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive'
      });
      return;
    }

    navigate('/dashboard');
  };
  
  // Clear rate limit when time expires
  useEffect(() => {
    if (rateLimitedUntil && Date.now() >= rateLimitedUntil) {
      setRateLimitedUntil(null);
    }
    const interval = setInterval(() => {
      if (rateLimitedUntil && Date.now() >= rateLimitedUntil) {
        setRateLimitedUntil(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [rateLimitedUntil]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">Ἑλληνικά</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Welcome</CardTitle>
            <CardDescription>Sign in or create an account to start learning</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-username">Name</Label>
                    <Input
                      id="signin-username"
                      type="text"
                      placeholder="Enter your name"
                      value={signInForm.username}
                      onChange={(e) => setSignInForm(prev => ({ ...prev, username: e.target.value }))}
                      disabled={isLoading}
                      autoComplete="username"
                    />
                    {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={signInForm.password}
                      onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="signin-remember" 
                      checked={signInForm.rememberMe}
                      onCheckedChange={(checked) => setSignInForm(prev => ({ ...prev, rememberMe: !!checked }))}
                    />
                    <Label htmlFor="signin-remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || !!rateLimitedUntil}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {rateLimitedUntil ? 'Please wait...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">
                      Choose a Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="scholar"
                      value={signUpForm.username}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, username: e.target.value }))}
                      disabled={isLoading}
                      autoComplete="username"
                    />
                    {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
                    <p className="text-xs text-muted-foreground">
                      This will be your unique display name. Must be unique.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="signup-remember" 
                      checked={signUpForm.rememberMe}
                      onCheckedChange={(checked) => setSignUpForm(prev => ({ ...prev, rememberMe: !!checked }))}
                    />
                    <Label htmlFor="signup-remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
