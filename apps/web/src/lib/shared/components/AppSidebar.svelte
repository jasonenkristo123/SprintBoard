<script lang="ts">
  import { Root } from "#lib/components/ui/sidebar/index.ts";
  import SidebarContent from "#lib/components/ui/sidebar/sidebar-content.svelte";
  import SidebarGroupContent from "#lib/components/ui/sidebar/sidebar-group-content.svelte";
  import SidebarGroup from "#lib/components/ui/sidebar/sidebar-group.svelte";
  import SidebarHeader from "#lib/components/ui/sidebar/sidebar-header.svelte";
  import SidebarMenuButton from "#lib/components/ui/sidebar/sidebar-menu-button.svelte";
  import SidebarMenuItem from "#lib/components/ui/sidebar/sidebar-menu-item.svelte";
  import SidebarMenu from "#lib/components/ui/sidebar/sidebar-menu.svelte";
  import { page } from "$app/state";
  import { HouseIcon, InboxIcon } from "@lucide/svelte";


  const menuItems = [
    {
        title: "Dashboard", url: "/dashboard", icon: HouseIcon,
    },
    {
        title: "Projects", url: "/projects", icon:InboxIcon
    }
  ]


</script>

<Root>
    <SidebarHeader>
        <div class="px-2 py-1.5 font-semibold text-xl">
            SprintBoard
        </div>
    </SidebarHeader>

    <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {#each menuItems as item (item.title)}
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={page.url.pathname === item.url} >
                                {#snippet child({ props })}
                                    <a href={item.url} {...props}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                {/snippet}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    {/each}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>
</Root>