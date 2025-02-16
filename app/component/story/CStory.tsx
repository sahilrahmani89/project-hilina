"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { useEditor } from '@tiptap/react'
import { useState } from 'react'
import { IconMapPin, IconPhoto, IconCategory, IconX } from '@tabler/icons-react'

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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: 'Share your travel experience...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }:{editor:any}) => {
      const html = editor.getHTML()
      setValue('content', html)
    },
  })

  const handleImageUpload = async (file: File) => {
    // Implement your image upload logic here
    return URL.createObjectURL(file)
  }

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
      // Reset form after submission
      editor?.commands.clearContent()
      setFeaturedPreview(null)
      setGalleryPreview([])
    } catch (error) {
      console.error('Submission error:', error)
    }
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

        {/* Location Search */}
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

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
            <IconPhoto className="w-5 h-5" /> Featured Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFeaturedImageChange}
              className="hidden"
              id="featuredImage"
            />
            <label
              htmlFor="featuredImage"
              className="cursor-pointer px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Upload Image
            </label>
            {featuredPreview && (
              <div className="relative">
                <img
                  src={featuredPreview}
                  alt="Featured preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFeaturedPreview(null)
                    setValue('featuredImage', null as any)
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {errors.featuredImage && (
            <p className="text-red-500 text-sm mt-1">{errors.featuredImage.message}</p>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">Travel Story</label>
          <div className="border rounded-lg p-4 min-h-[300px]">
            {editor && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 border-b pb-2">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 ${editor.isActive('heading') ? 'bg-gray-200' : ''}`}
                  >
                    H2
                  </button>
                  {/* Add more editor controls as needed */}
                </div>
                {/* <EditorContent editor={editor} /> */}
              </div>
            )}
          </div>
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
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

        {/* SEO Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <input
                {...register('metaTitle')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                maxLength={60}
              />
              <p className="text-sm text-gray-500 mt-1">{watch('metaTitle')?.length || 0}/60</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                {...register('metaDescription')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                maxLength={160}
              />
              <p className="text-sm text-gray-500 mt-1">{watch('metaDescription')?.length || 0}/160</p>
            </div>
          </div>
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