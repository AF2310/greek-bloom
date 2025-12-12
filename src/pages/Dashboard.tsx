import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Library, 
  History, 
  TrendingUp, 
  Target, 
  Clock,
  ArrowRight,
  Layers,
  CircleDot,
  Keyboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { words, sessions, studyActivities, wordGroups } from '@/lib/mockData';

export default function Dashboard() {
  const totalWords = words.length;
  const totalCorrect = words.reduce((sum, w) => sum + w.correctCount, 0);
  const totalWrong = words.reduce((sum, w) => sum + w.wrongCount, 0);
  const accuracy = totalCorrect + totalWrong > 0 
    ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) 
    : 0;

  const lastSession = sessions[0];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return Layers;
      case 'quiz': return CircleDot;
      case 'typing': return Keyboard;
      default: return BookOpen;
    }
  };

  return (
    <Layout breadcrumbs={[{ name: 'Dashboard' }]}>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-4xl font-bold text-foreground">
            καλημέρα! <span className="text-muted-foreground font-sans text-2xl font-normal">Good morning!</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Continue your journey through Ancient Greek.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Words</CardTitle>
              <Library className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalWords}</div>
              <p className="text-xs text-muted-foreground">in your vocabulary</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Mastered</CardTitle>
              <Target className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {words.filter(w => w.correctCount >= 10 && w.wrongCount <= 2).length}
              </div>
              <p className="text-xs text-muted-foreground">words mastered</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
              <TrendingUp className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{accuracy}%</div>
              <p className="text-xs text-muted-foreground">overall accuracy</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sessions</CardTitle>
              <History className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{sessions.length}</div>
              <p className="text-xs text-muted-foreground">study sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Last Session */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Last Session
              </CardTitle>
              <CardDescription>Your most recent study activity</CardDescription>
            </CardHeader>
            <CardContent>
              {lastSession ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="font-medium text-foreground">{lastSession.activityName}</p>
                    <p className="text-sm text-muted-foreground">
                      {lastSession.groupName || 'All words'}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {lastSession.startTime.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-success">✓ {lastSession.correctCount} correct</span>
                    <span className="text-destructive">✗ {lastSession.wrongCount} wrong</span>
                  </div>
                  <Link to="/sessions">
                    <Button variant="outline" className="w-full">
                      View All Sessions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-muted-foreground">No sessions yet. Start studying!</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Study Activities
              </CardTitle>
              <CardDescription>Choose an activity to start learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {studyActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <Link 
                      key={activity.id} 
                      to={`/activities/${activity.id}`}
                      className="group"
                    >
                      <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-md group-hover:-translate-y-1">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground">{activity.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {activity.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Word Groups Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Word Groups</CardTitle>
              <CardDescription>Organize your vocabulary by topic</CardDescription>
            </div>
            <Link to="/groups">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {wordGroups.map((group) => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary hover:bg-muted/50">
                    <h4 className="font-medium text-foreground">{group.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{group.wordCount} words</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
