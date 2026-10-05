'use client';

import 'tinymce/tinymce';
import 'tinymce/models/dom';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide-dark/skin.js';
import 'tinymce/skins/content/dark/content.js';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/help/js/i18n/keynav/en.js';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/wordcount';

import { Editor } from '@tinymce/tinymce-react';

type TFCWebProjectEditorProps = {
    id: string;
    value: string;
    onChange: (html: string) => void;
};

const CONTENT_STYLE = `
  body { font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif; font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.75); background: #1F1F1F; max-width: 100%; }
  h2 { font-family: Barlow, ui-sans-serif, system-ui, sans-serif; font-weight: 700; text-transform: uppercase; color: #ffffff; font-size: 30px; margin-top: 40px; }
  p, ul, ol, blockquote, table, hr { margin-top: 20px; }
  body > :first-child { margin-top: 0; }
  a { color: #76B82A; text-decoration: underline; text-underline-offset: 4px; }
  strong, b { color: #ffffff; font-weight: 600; }
  ul { list-style: disc; padding-left: 24px; }
  ol { list-style: decimal; padding-left: 24px; }
  li { margin-bottom: 8px; }
  blockquote { border-left: 4px solid #76B82A; padding-left: 20px; color: #76B82A; font-weight: 500; }
  blockquote p { margin-top: 8px; }
  img { width: 100%; max-width: 1152px; aspect-ratio: 4 / 3; max-height: 440px; object-fit: cover; border-radius: 12px; }
  hr { border: 0; border-top: 1px solid rgba(255,255,255,0.15); margin-top: 20px; }
  table { width: 100%; border-collapse: collapse; font-size: 16px; }
  th { text-align: left; color: #ffffff; font-weight: 600; }
  th, td { border-bottom: 1px solid rgba(255,255,255,0.15); padding: 10px; }
`;


export const FCWebProjectEditor = ({ id, value, onChange }: TFCWebProjectEditorProps) => {
    return (
        <Editor
            id={id}
            licenseKey="gpl"
            value={value}
            onEditorChange={onChange}
            init={{
                skin: 'oxide-dark',
                content_css: false,
                promotion: false,
                branding: false,
                menubar: 'file edit view insert format tools table help',
                menu: { file: { title: 'File', items: 'preview' } },
                plugins: 'autolink autoresize code fullscreen help image link lists preview searchreplace table visualblocks wordcount',
                toolbar:
                    'undo redo | blocks | bold italic underline strikethrough | bullist numlist blockquote | link image table | removeformat code | searchreplace preview fullscreen',
                block_formats: 'Párrafo=p; Título 2=h2',
                valid_elements:
                    'p,h2,br,hr,ul,ol,li,blockquote,strong/b,em/i,u,s,a[href|target|rel],img[src|alt|width|height],figure,figcaption,table,thead,tbody,tr,th[colspan|rowspan],td[colspan|rowspan]',
                min_height: 400,
                autoresize_bottom_margin: 20,
                automatic_uploads: false,
                convert_urls: false,
                paste_as_text: false,
                paste_block_drop: true,
                content_style: CONTENT_STYLE,
            }}
        />
    );
};
