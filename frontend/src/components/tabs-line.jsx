import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsLine({ setTabVal, tabVal }) {
  return (
    <Tabs>
      <TabsList variant="line" value="assigned">
        <TabsTrigger value="assigned" onClick={() => setTabVal("assigned")}>
          Assigned
        </TabsTrigger>
        <TabsTrigger value="created" onClick={() => setTabVal("created")}>
          Created
        </TabsTrigger>
        <TabsTrigger value="watching" onClick={() => setTabVal("watching")}>
          Watching
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
