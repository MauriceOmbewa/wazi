import { Component } from '@angular/core';
import { StaticInfo } from '../dashboard/static-info/static-info';
import { FeatureCards } from '../dashboard/feature-cards/feature-cards';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [StaticInfo, FeatureCards],
  templateUrl: './content-management.html',
  styleUrl: './content-management.css',
})
export class ContentManagement {

}
