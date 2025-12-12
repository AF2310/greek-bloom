import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { words, wordGroups } from '@/lib/mockData';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { sanitizeInput } from '@/lib/security';
import { cn } from '@/lib/utils';

type SortField = 'greek' | 'english' | 'partOfSpeech' | 'correctCount' | 'wrongCount';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export default function Words() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('greek');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedWords = useMemo(() => {
    const sanitizedSearch = sanitizeInput(search.toLowerCase());
    
    let filtered = words.filter(word => 
      word.greek.toLowerCase().includes(sanitizedSearch) ||
      word.transliteration.toLowerCase().includes(sanitizedSearch) ||
      word.english.toLowerCase().includes(sanitizedSearch)
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'greek':
          comparison = a.greek.localeCompare(b.greek);
          break;
        case 'english':
          comparison = a.english.localeCompare(b.english);
          break;
        case 'partOfSpeech':
          comparison = a.partOfSpeech.localeCompare(b.partOfSpeech);
          break;
        case 'correctCount':
          comparison = a.correctCount - b.correctCount;
          break;
        case 'wrongCount':
          comparison = a.wrongCount - b.wrongCount;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [search, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedWords.length / ITEMS_PER_PAGE);
  const paginatedWords = filteredAndSortedWords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getGroupNames = (groupIds: string[]) => {
    return groupIds.map(id => wordGroups.find(g => g.id === id)?.name || id);
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead>
      <Button 
        variant="ghost" 
        size="sm" 
        className="gap-1 -ml-3 font-medium"
        onClick={() => handleSort(field)}
      >
        {children}
        <ArrowUpDown className={cn(
          "h-4 w-4",
          sortField === field && "text-primary"
        )} />
      </Button>
    </TableHead>
  );

  return (
    <Layout breadcrumbs={[{ name: 'Words' }]}>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Words</h1>
            <p className="mt-1 text-muted-foreground">
              {filteredAndSortedWords.length} words in your vocabulary
            </p>
          </div>
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search words..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <SortHeader field="greek">Greek</SortHeader>
                <TableHead>Transliteration</TableHead>
                <SortHeader field="english">English</SortHeader>
                <SortHeader field="partOfSpeech">Part of Speech</SortHeader>
                <SortHeader field="correctCount">Correct</SortHeader>
                <SortHeader field="wrongCount">Wrong</SortHeader>
                <TableHead>Groups</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedWords.map((word) => (
                <TableRow key={word.id}>
                  <TableCell>
                    <Link 
                      to={`/words/${word.id}`}
                      className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors greek-text"
                    >
                      {word.greek}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground italic">
                    {word.transliteration}
                  </TableCell>
                  <TableCell>{word.english}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {word.partOfSpeech}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-success font-medium">
                    {word.correctCount}
                  </TableCell>
                  <TableCell className="text-destructive font-medium">
                    {word.wrongCount}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {getGroupNames(word.groupIds).slice(0, 2).map((name, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                      {word.groupIds.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{word.groupIds.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedWords.length)} of{' '}
              {filteredAndSortedWords.length} words
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
