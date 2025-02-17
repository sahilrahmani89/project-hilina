"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useState, useEffect } from 'react'
import { IconMapPin, IconPhoto, IconCategory, IconX, IconColorPicker } from '@tabler/icons-react'

// Zod Schema
const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120),
  location: z.string().min(1, 'Location is required'),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.instanceof(File).refine(file => file.size <= 5_000_000, 'File size should be less than 5MB'),
  gallery: z.array(z.instanceof(File)).optional(),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  status: z.enum(['draft', 'published'])
})

type BlogPostFormValues = z.infer<typeof blogPostSchema>

export default function BlogPostForm() {
  const [galleryPreview, setGalleryPreview] = useState<string[]>([])
  const [featuredPreview, setFeaturedPreview] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState('#000000')
  
  const { 
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      status: 'draft'
    }
  })

  // TipTap Editor Configuration
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder: 'Share your travel experience...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setValue('content', html)
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] p-4',
        style: 'color: inherit', // Allow color inheritance
      },
    },
  })

  // Update color when selection changes
  useEffect(() => {
    if (!editor) return

    const updateColor = () => {
      const color = editor.getAttributes('textStyle').color
      setSelectedColor(color || '#000000')
    }

    editor.on('selectionUpdate', updateColor)
    return () => {
      editor.off('selectionUpdate', updateColor)
    }
  }, [editor])

  const handleFeaturedImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue('featuredImage', file)
      setFeaturedPreview(URL.createObjectURL(file))
    }
  }

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setValue('gallery', files)
    setGalleryPreview(files.map(file => URL.createObjectURL(file)))
  }

  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      // Implement your submission logic
      console.log('Form data:', data)
      editor?.commands.clearContent()
      setFeaturedPreview(null)
      setGalleryPreview([])
    } catch (error) {
      console.error('Submission error:', error)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title & Status */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Post Title</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Amazing Himalayan Trek Experience"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Post Status</label>
            <select
              {...register('status')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Publish</option>
            </select>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">Travel Story</label>
          <div className="border rounded-lg overflow-hidden">
            <div className="border-b p-2 bg-gray-50 flex gap-2 flex-wrap">
              {/* Formatting Controls */}
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded ${
                  editor.isActive('heading', { level: 2 }) 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'hover:bg-gray-100'
                }`}
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${
                  editor.isActive('bold') 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${
                  editor.isActive('bulletList') 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'hover:bg-gray-100'
                }`}
              >
                List
              </button>

              {/* Color Picker */}
              <div className="relative flex items-center gap-1">
                <button
                  type="button"
                  className="p-2 rounded hover:bg-gray-100"
                  onClick={() => document.getElementById('colorPicker')?.click()}
                >
                  <IconColorPicker className="w-5 h-5" />
                </button>
                <input
                  type="color"
                  id="colorPicker"
                  value={selectedColor}
                  className="absolute opacity-0 w-0 h-0"
                  onChange={(e) => {
                    const color = e.target.value
                    setSelectedColor(color)
                    editor.chain().focus().setColor(color).run()
                  }}
                />
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: selectedColor }}
                />
                <button
                  type="button"
                  className="p-2 rounded hover:bg-gray-100"
                  onClick={() => {
                    editor.chain().focus().unsetColor().run()
                    setSelectedColor('#000000')
                  }}
                >
                  Reset
                </button>
              </div>

              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    editor.chain().focus().setImage({ src: url }).run()
                  }
                }}
                className="hidden"
                id="editorImage"
              />
              <label
                htmlFor="editorImage"
                className="p-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                Insert Image
              </label>
            </div>
            <EditorContent editor={editor} />
          </div>
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
            <IconMapPin className="w-5 h-5" /> Location
          </label>
          <input
            {...register('location')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search location..."
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
            <IconCategory className="w-5 h-5" /> Categories
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Adventure', 'Cultural', 'Food', 'Luxury', 'Budget', 'Family'].map(category => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={category}
                  {...register('categories')}
                  className="rounded text-blue-500"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
          {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
        </div>

        {/* Submit Section */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  )
}