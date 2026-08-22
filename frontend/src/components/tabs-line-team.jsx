import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsLineTeam({ setTeamMember, tabTeamMember }) {
  return (
    <Tabs>
      <TabsList variant="line" value="assigned">
        <TabsTrigger value="design" onClick={() => setTeamMember("design")}>
          Design
        </TabsTrigger>
        <TabsTrigger value="web" onClick={() => setTeamMember("web")}>
          Web
        </TabsTrigger>
        <TabsTrigger value="frontend" onClick={() => setTeamMember("frontend")}>
          Frontend
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
