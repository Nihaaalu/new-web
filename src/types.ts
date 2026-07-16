/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
}

export interface Client {
  name: string;
  logo: string;
  link: string;
}

export interface MessageForm {
  name: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export type TabType = "home" | "gallery" | "about" | "contact";
