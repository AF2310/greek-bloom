import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Layers, CircleDot, Keyboard, BookOpen, Play, Eye, Link2, Headphones, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { studyActivities } from '@/lib/mockData';

export default function StudyActivities() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return Layers;
      case 'quiz': return CircleDot;
      case 'typing': return Keyboard;
      case 'matching': return Link2;
      case 'listening': return Headphones;
      case 'spelling': return PenTool;
      default: return BookOpen;
    }
  };

  return (
    <Layout breadcrumbs={[{ name: 'Study Activities' }]}>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Study Activities</h1>
          <p className="mt-2 text-muted-foreground">Choose an activity to practice your Ancient Greek vocabulary.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studyActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <Card key={activity.id} className="card-hover overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <CardHeader>
                  <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{activity.name}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Link to={`/activities/${activity.id}`} className="flex-1">
                      <Button className="w-full gap-2">
                        <Play className="h-4 w-4" />
                        Launch
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
