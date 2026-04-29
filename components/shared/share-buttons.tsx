"use client";

import { useCallback, useMemo, useState } from "react";
import { Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShareButtonsProps = {
  className?: string;
  title: string;
  urlPath: string;
  shareText?: string;
};

export function ShareButtons({ className, title, urlPath, shareText }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    if (base) return new URL(urlPath, base).toString();
    return urlPath;
  }, [urlPath]);

  const text = shareText ?? `Try this ${title}: ${absoluteUrl}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }, [absoluteUrl]);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: absoluteUrl });
        return;
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }, [absoluteUrl, text, title]);

  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center", className)}>
      <Button type="button" variant="outline" onClick={handleCopy} size="lg" className="w-full gap-2 sm:w-auto">
        <Link2 className="h-4 w-4" />
        {copied ? "Copied" : "Copy link"}
      </Button>
      <Button type="button" variant="outline" onClick={handleShare} size="lg" className="w-full gap-2 sm:w-auto">
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
}
