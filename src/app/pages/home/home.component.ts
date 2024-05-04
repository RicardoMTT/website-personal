import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { ICarouselItem } from 'src/app/components/carousel/carousel.component';
import { CAROUSEL_DATA_ITEMS } from 'src/app/constants/carousel.const';
import { ChatService } from 'src/app/services/chat.service';
import { GeminiService } from 'src/app/services/gemini.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  error: boolean = false;
  element:any;
  @ViewChild('chatMessages', { read: ElementRef }) chatMessagesRef!: ElementRef;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private modalService: ModalService,
    private geminiService:GeminiService) {

  }

  public showButton = false;
  public showModal = false;
  public message = '';
  bodyText: string = "";

  public scrollHeigth = 600;
  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  public messages:any[] = [];

  ngOnInit(): void {
    this.bodyText ="zzzzzz";
    this.element = document.getElementById('chat-messages');

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeigth; //Cuando nos desplazamos unos 600px aparecera el boton
  }

  redirectTop() {
    this.document.documentElement.scrollTop = 0;
  }

  showChat: boolean = false;

  toggleChat() {
    this.showChat = !this.showChat;
  }

  async sendMessage(){
    if (this.message.length<=0) {
      return;
    }
    const prompt = this.message;
    this.error = false;
    this.message = '';
    try {

      this.messages.push({message:prompt,isUser:true})
      setTimeout(()=>{
        this.scrollToBottom();
      },500)
      if (prompt.length <=0) {
        return;
      }
      const response = await this.geminiService.generateText(prompt)
      this.messages.push({message:response,isUser:false});
      setTimeout(()=>{
        this.scrollToBottom();
      },500)
    } catch (error) {
      console.log(error);
      this.error = true;
      this.messages.push({message:'Ha habido un error intente nuevamente',error:true});
      setTimeout(()=>{
        this.scrollToBottom();
      },500)
    }

  }

  scrollToBottom() {
    if (this.chatMessagesRef) {
      const chatMessages: HTMLElement = this.chatMessagesRef.nativeElement;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}
