import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesigncampaignComponent } from './designcampaign.component';
import { CampaignslistComponent } from './campaignslist/campaignslist.component';
import { CreatecampaignComponent } from './createcampaign/createcampaign.component';
import { EditcampaignComponent } from './updatecampaign/editcampaign.component';
const routes: Routes = [

  {
    path: '',
    component:CampaignslistComponent
    },
    {
      path: 'design',
      component: DesigncampaignComponent,
      data: {
        title: 'Design Campaign',
        urls: [{ title: 'Campaign', url: '/campaign' }, { title: 'Design Email' }]
      }
    },
    // {
    //   path: 'campaign-list',
    //   component: CampaignslistComponent,
    //   data: {
    //     title: 'Campaign List',
    //     urls: [{ title: 'Campaign', url: '/campaign' }, { title: 'Campaign List' }]
    //   }
    // },
    // {
    //   path: 'create-campaign',
    //   component: CreatecampaignComponent,
    //   data: {
    //     title: 'Create Campaign',
    //     urls: [{ title: 'Campaign', url: '/create-campaign' }, { title: 'Create Campaign' }]
    //   }
    // }, 
    {
      path: 'edit-campaign/:id',
      component: EditcampaignComponent,
      data: {
        title: 'Edit Campaign',
        urls: [{ title: 'Campaign', url: '/edit-campaign' }, { title: 'Edit Campaign' }]
      }
    },

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesigncampaignRoutingModule {}
