import { ModuleCard } from '@/components/modules/ModuleCard';
import { ProposeModuleDialog } from '@/components/modules/ProposeModuleDialog';
import { mockModules } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function ModulesMarketplacePage() {
  // TODO: Implement actual filtering and search
  const modules = mockModules;

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Module Marketplace</h1>
          <p className="text-muted-foreground">Discover, vote, and propose learning modules.</p>
        </div>
        <ProposeModuleDialog />
      </section>

      <section className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search modules..." className="pl-10 w-full" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="data-science">Data Science</SelectItem>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module)
 => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </section>
      {modules.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No modules found. Be the first to propose one!
        </p>
      )}
    </div>
  );
}
