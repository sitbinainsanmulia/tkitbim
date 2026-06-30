import {
  Plus,
  PlusCircle,
  MessageSquarePlus,
  ImagePlus,
  ClipboardList,
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Phone,
  MessageCircle,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Baby,
  X,
  Trash2,
  Download,
  Pencil,
  FileEdit,
  AlertCircle,
  ChevronDown,
  UserRound,
  Users as UsersIcon,
  Quote,
  Landmark,
  Users,
  ImageIcon,
  Info,
  MapPin,
  Lock,
  LogOut,
  Mail,
  Map,
  Clock,
  User,
  UserPlus,
  Smartphone,
  GalleryHorizontalEnd,
  PlayCircle,
  Loader2,
  Star,
  RefreshCw,
  HelpCircle,
  Route,
  Save,
  GraduationCap,
  Search,
  Send,
  Share2,
  Stars,
  HeadsetIcon,
  BadgeCheck,
  Eye,
  LayoutDashboard,
  Settings,
  BookOpenCheck,
  Award,
  // Dynamic icons from Programs/Schedule DB entries
  Brush,
  Globe,
  TreePine,
  Heart,
  Dumbbell,
  Sun,
  Utensils,
  Home,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapping from Google Material Symbols icon names to Lucide React components.
 * This eliminates the need for the 1.1MB Material Symbols Outlined web font.
 */
const iconMap: Record<string, LucideIcon> = {
  // Navigation & Actions
  add: Plus,
  add_circle: PlusCircle,
  add_comment: MessageSquarePlus,
  add_photo_alternate: ImagePlus,
  app_registration: ClipboardList,
  arrow_back: ArrowLeft,
  arrow_downward: ArrowDown,
  arrow_forward: ArrowRight,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  close: X,
  delete: Trash2,
  download: Download,
  edit: Pencil,
  edit_document: FileEdit,
  expand_more: ChevronDown,
  refresh: RefreshCw,
  save: Save,
  search: Search,
  send: Send,
  share: Share2,
  visibility: Eye,

  // Content & Communication
  auto_stories: BookOpen,
  call: Phone,
  chat: MessageCircle,
  format_quote: Quote,
  mail: Mail,
  rate_review: Star,
  request_quote: HelpCircle,

  // People & Users
  badge: Award,
  child_care: Baby,
  face: UserRound,
  family_restroom: UsersIcon,
  group: Users,
  groups: Users,
  manage_accounts: Settings,
  person: User,
  person_add: UserPlus,
  support_agent: HeadsetIcon,

  // Status & Feedback
  check: Check,
  check_circle: CheckCircle,
  error: AlertCircle,
  info: Info,
  pending_actions: Clock,
  progress_activity: Loader2,
  verified: BadgeCheck,

  // Places & Maps
  foundation: Landmark,
  location_on: MapPin,
  map: Map,
  route: Route,
  home: Home,

  // Media & Files
  image: ImageIcon,
  photo_library: GalleryHorizontalEnd,
  play_circle: PlayCircle,
  phone_iphone: Smartphone,

  // Misc
  lock: Lock,
  logout: LogOut,
  star: Star,
  stars: Stars,

  // Dashboard specific
  dashboard: LayoutDashboard,
  school: GraduationCap,
  schedule: Clock,
  settings: Settings,
  quiz: HelpCircle,
  reviews: Star,

  // Dynamic icons from Programs DB
  menu_book: BookOpenCheck,
  language: Globe,
  palette: Brush,
  volunteer_activism: Heart,
  nature_people: TreePine,
  sports_handball: Dumbbell,

  // Dynamic icons from Schedules DB
  wb_sunny: Sun,
  draw: Brush,
  restaurant: Utensils,
  menu: LayoutDashboard,
};

interface MaterialIconProps {
  /** The Material Symbols icon name (e.g. "arrow_forward", "check") */
  name: string;
  /** Additional CSS class names for styling (size, color, etc.) */
  className?: string;
  /** Whether the icon should spin (for loading indicators) */
  spin?: boolean;
}

/**
 * Drop-in replacement for `<span className="material-symbols-outlined">icon_name</span>`.
 * Uses Lucide React SVGs instead of the 1.1MB Google Material Symbols web font.
 *
 * @example
 * // Before:
 * <span className="material-symbols-outlined text-sm">arrow_forward</span>
 *
 * // After:
 * <MaterialIcon name="arrow_forward" className="text-sm" />
 */
export function MaterialIcon({ name, className = "", spin = false }: MaterialIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback: render the icon name as text for unmapped icons
    // This ensures admin features with custom icons don't break
    return <span className={className}>{name}</span>;
  }

  return (
    <IconComponent
      className={`${spin ? "animate-spin" : ""} ${className}`.trim()}
      // Lucide icons default to 24px with stroke. We use w/h = 1em to match
      // the Material Symbols behavior of inheriting font-size for sizing.
      style={{ width: "1em", height: "1em" }}
    />
  );
}
