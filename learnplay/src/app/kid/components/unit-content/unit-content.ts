import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomVideoPlayerComponent } from '../../../shared/components/custom-video-player/custom-video-player.component';

interface Note {
  icon?: string;
  image?: string;
  title: string;
  content?: string;
  htmlContent?: string;
  // Tailwind specific styling classes
  styles: {
    bg: string;
    border: string;
    iconColor: string;
  };
}

@Component({
  selector: 'app-unit-content',
  imports: [CommonModule, MatIconModule, MatButtonModule, CustomVideoPlayerComponent],
  templateUrl: './unit-content.html',
  styleUrl: './unit-content.css',
})
export class UnitContent implements OnInit {
  // Data Holder
  contentData = {
    title: '',
    unitName: '',
    videoTitle: '',
    videoId: '',
    notes: [] as any[],
  };

  // DATABASE: Mock Content
  lessonDatabase: { [key: string]: any } = {
    'word-problems': {
      title: 'Subtraction Word Problems',
      unitName: 'Unit 2: Subtraction Fun',
      videoTitle: 'Cocomelon - Nursery Rhymes',
      videoId: 'M7lc1UVf-VE',
      notes: [
        {
          image: 'assets/icons/bulb.png',
          title: 'Key Concept',
          content:
            'Word problems help us use subtraction in real life! Read the problem carefully to find what numbers to subtract.',
          styles: { bg: 'bg-[#F1E2FB]', border: 'border-[#C999F5]', iconColor: 'text-[#9333EA]' },
        },
        {
          image: 'assets/icons/notebook.png',
          title: 'Steps to solve',
          htmlContent:
            '<ol class="list-decimal pl-5 space-y-1"><li>Read the problem twice</li><li>Find the starting number</li><li>Find how many to take away</li><li>Write the subtraction equation</li><li>Solve and check your answer</li></ol>',
          styles: { bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]', iconColor: 'text-[#137CFF]' },
        },
        {
          image: 'assets/icons/pen.png',
          title: 'Example',
          htmlContent:
            '<strong>Problem:</strong> Maria has 15 apples. She gives 6 to her friend. How many apples does she have left?<br><div class="mt-2 font-bold text-green-700">Solution: 15 - 6 = 9 apples</div>',
          styles: { bg: 'bg-[#DCF9EA]', border: 'border-[#4ADE80]', iconColor: 'text-[#1DBC57]' },
        },
        {
          image: 'assets/icons/indicator.png',
          title: 'Remember',
          content:
            'Look for keywords like "left", "remaining", "how many more", or "difference" - these often mean subtraction!',
          styles: { bg: 'bg-[#FEFCE8]', border: 'border-[#FEF08A]', iconColor: 'text-[#AA9600]' },
        },
        {
          image: 'assets/icons/bullpoint.png',
          title: 'Practice Tip',
          content: 'Draw pictures to help you visualize the problem. It makes solving much easier!',
          styles: { bg: 'bg-[#FFF0EF]', border: 'border-[#E37974]', iconColor: 'text-[#CF4842]' },
        },
      ],
    },
    'small-numbers': {
      title: 'Subtracting Small Numbers',
      unitName: 'Unit 2: Subtraction Fun',
      videoTitle: 'Cocomelon - Nursery Rhymes',
      videoId: 'M7lc1UVf-VE',
      notes: [
        {
          image: 'assets/icons/pen.png',
          title: 'Quick Tip',
          content: 'Use your fingers to count backwards!',
          styles: { bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]', iconColor: 'text-[#137CFF]' },
        },
      ],
    },
  };

  isLessonComplete = false;
  isVideoPlaying = false;

  notes: Note[] = [
    {
      image: 'assets/icons/bulb.png',
      title: 'Key Concept',
      content:
        'Word problems help us use subtraction in real life! Read the problem carefully to find what numbers to subtract.',
      styles: { bg: 'bg-[#F1E2FB]', border: 'border-[#C999F5]', iconColor: 'text-[#9333EA]' },
    },
    {
      image: 'assets/icons/notebook.png',
      title: 'Steps to solve',
      // Added tailwind classes to the HTML string for the list
      htmlContent:
        '<ol class="list-decimal pl-5 space-y-1"><li>Read the problem twice</li><li>Find the starting number</li><li>Find how many to take away</li><li>Write the subtraction equation</li><li>Solve and check your answer</li></ol>',
      styles: { bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]', iconColor: 'text-[#137CFF]' },
    },
    {
      image: 'assets/icons/pen.png',
      title: 'Example',
      htmlContent:
        '<strong>Problem:</strong> Maria has 15 apples. She gives 6 to her friend. How many apples does she have left?<br><div class="mt-2 font-bold text-green-700">Solution: 15 - 6 = 9 apples</div>',
      styles: { bg: 'bg-[#DCF9EA]', border: 'border-[#4ADE80]', iconColor: 'text-[#1DBC57]' },
    },
    {
      image: 'assets/icons/indicator.png',
      title: 'Remember',
      content:
        'Look for keywords like "left", "remaining", "how many more", or "difference" - these often mean subtraction!',
      styles: { bg: 'bg-[#FEFCE8]', border: 'border-[#FEF08A]', iconColor: 'text-[#AA9600]' },
    },
    {
      image: 'assets/icons/bullpoint.png',
      title: 'Practice Tip',
      content: 'Draw pictures to help you visualize the problem. It makes solving much easier!',
      styles: { bg: 'bg-[#FFF0EF]', border: 'border-[#E37974]', iconColor: 'text-[#CF4842]' },
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const lessonId = params.get('lessonId');

      if (lessonId && this.lessonDatabase[lessonId]) {
        this.contentData = this.lessonDatabase[lessonId];
      }
    });
  }

  markAsComplete() {
    this.isLessonComplete = true;
  }

  resetLesson() {
    this.isLessonComplete = false;
  }

  playVideo() {
    this.isVideoPlaying = true;
  }

  onVideoReady() {
    console.log('Video is ready to play');
  }

  onVideoStateChange(state: number) {
    // YouTube Player States: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    console.log('Video state changed:', state);
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
